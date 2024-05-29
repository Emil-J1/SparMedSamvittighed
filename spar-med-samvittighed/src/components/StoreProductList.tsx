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
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-2xl font-bold mb-5 text-white">Indlæser</h3>
        <Image src="/loading.gif" alt="Indlæser" width={30} height={30} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">Error: {error}</div>
    );
  }

  if (!storeData) {
    return (
      <p className="text-2xl font-medium m-4 text-white">
        Butikken kunne ikke findes.
      </p>
    );
  }

  return (
    <section className="text-center px-10 w-3/5 max-sm:w-screen">
      <div className="bg-white backdrop-blur bg-opacity-25 p-2 rounded-lg">
      <h2 className="text-3xl font-bold mb-2 text-black">{storeData.store.name}</h2>
      <h2 className="text-xl font-medium text-gray-800">{storeData.store.address.street}</h2>
      </div>
      <hr className="m-5 mt-7"/>
      {storeData.clearances && storeData.clearances.length > 0 ? (
        <div>
          <h2 className="text-xl font-bold text-white mb-8">Nedsatte produkter:</h2>
          <ul className="list-disc space-y-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {storeData.clearances.map((clearance, index) => (
                <li
                  key={index}
                  className="col-span-1 flex flex-col justify-center gap-2 p-2 rounded-lg shadow-sm text-gray-800 py-10 p-4 rounded-lg bg-stone-100	"
                >
                  <a href={`${storeData.store.id}/products/${clearance.product.ean}`}>
                    <h3 className="text-lg font-bold">{clearance.product.description}</h3>
                    <br />
                    <picture className=" flex justify-center align-center mx-2" style={{
                          display: clearance.product.image ? "block" : "none",
                        }}>
                      <img
                        className="w-full max-h-52 object-contain"
                        src={clearance.product.image}
                        alt={clearance.product.description}
                      />
                    </picture>
                    <p className="mt-4 font-medium">Før pris: {clearance.offer.originalPrice} kr</p>
                    <p className=" m-2 font-medium">
                      Nedsat pris: {clearance.offer.newPrice} kr
                    </p>
                    {clearance.offer.endTime && (
                      <p className="font-medium">
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
        </div>
      ) : (
        <p className="text-2xl font-medium m-12 text-gray-800">Ingen nedsatte produkter fundet.</p>
      )}
    </section>
  );
};

export default StoreProductList;
