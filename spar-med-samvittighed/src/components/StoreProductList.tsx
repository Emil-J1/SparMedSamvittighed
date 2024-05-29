"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ClearanceOffer {
  currency: string;
  discount: number;
  ean: string;
  endTime: string;
  lastUpdate: string;
  newPrice: number;
  originalPrice: number;
  percentDiscount: number;
  startTime: string;
  stock: number;
  stockUnit: string;
}

interface ClearanceProduct {
  categories: { [key: string]: string };
  description: string;
  ean: string;
  image: string;
}

interface Clearance {
  offer: ClearanceOffer;
  product: ClearanceProduct;
}

interface Store {
  id: string;
  name: string;
  address: {
    street: string;
  };
}

interface StoreData {
  store: Store;
  clearances: Clearance[];
}

interface StoreProductListProps {
  storeId: string;
}

const StoreProductList: React.FC<StoreProductListProps> = ({ storeId }) => {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "034a1ccb-ee77-48b1-a842-31d34068d90a"; // Replace with your actual bearer token
        const response = await fetch(
          `https://api.sallinggroup.com/v1/food-waste/${storeId}`, // Adjust the URL according to API specs
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data: StoreData = await response.json();
        console.log("Fetched store data:", data); // Log fetched data
        setStoreData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } 
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [storeId]); // Include storeId in the dependency array to fetch data when it changes

  if (isLoading) {
    return (
      <section className="flex flex-col justify-center items-center">
        <h3 className="text-xl mb-5">Indlæser</h3>
        <Image src="/loading.gif" alt="Indlæser" width={30} height={30} />
      </section>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">Error: {error}</div>
    );
  }

  if (!storeData) {
    return null; // or some fallback UI
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-1">{storeData.store.name}</h2>
      <h2 className="text-1xl mb-12">{storeData.store.address.street}</h2>
      {storeData.clearances && storeData.clearances.length > 0 ? (
        <>
          <h2 className="text-xl font-bold mb-4">Nedsatte produkter:</h2>
          <ul className="list-disc space-y-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {storeData.clearances.map((clearance, index) => (
                <li
                  key={index}
                  className="col-span-1 flex flex-col justify-center gap-2 p-2 border rounded-lg shadow-sm"
                >
                  <a href={`${storeData.store.id}/products/${clearance.product.ean}`}>
                    <h3 className="font-bold">{clearance.product.description}</h3>
                    <br />
                    <picture className="aspect-ratio aspect-[3/2] max-w-60 flex justify-center">
                      <img
                        className="max-h-52 object-cover"
                        src={clearance.product.image}
                        alt={clearance.product.description}
                        style={{
                          display: clearance.product.image ? "block" : "none",
                        }}
                      />
                    </picture>
                    <p>Før pris: {clearance.offer.originalPrice} kr</p>
                    <p className="font-medium">
                      Nedsat pris: {clearance.offer.newPrice} kr
                    </p>
                    {clearance.offer.endTime && (
                      <p>
                        Udløbsdato:{" "}
                        {new Date(clearance.offer.endTime).toLocaleDateString(
                          "da-DK"
                        )}
                      </p>
                    )}
                  </a>
                </li>
              ))}
            </div>
          </ul>
        </>
      ) : (
        <p>Ingen nedsatte produkter fundet.</p>
      )}
    </>
  );
};

export default StoreProductList;
