"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Clearance {
  offer: {
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
  };
  product: {
    categories: { [key: string]: string };
    description: string;
    ean: string;
    image: string;
  };
}

interface StoreData {
  store: {
    name: string;
    address: {
      street: string;
    };
  };
  clearances: Clearance[]; // Array of Clearance objects
  // Add other properties from the API response if needed
}

const StoreProductList: React.FC = () => {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "034a1ccb-ee77-48b1-a842-31d34068d90a"; // Replace with your actual bearer token
        const response = await fetch(
          `https://api.sallinggroup.com/v1/food-waste/d6abf195-312b-4818-8933-bda8ecdd9fbd`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setStoreData(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup function to cancel fetch request if component unmounts
    return () => {
      // Your cleanup code here, for example, cancelling any ongoing requests
    };
  }, []); // Empty dependency array means this effect runs only once after the initial render

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
      <div className="text-center p-4 text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-1">{storeData?.store?.name}</h2>
      <h2 className="text-1xl mb-12">{storeData?.store.address.street}</h2>
      {/* Check if storeData exists and has clearances before mapping */}
      {storeData?.clearances && (
        <>
          <h2 className="text-xl font-bold mb-4">Nedsatte produkter:</h2>
          <ul className="list-disc space-y-2">
            {/* Map through clearances and render product details */}
            {storeData.clearances.map((clearance, index) => (
              <li key={index} className="list-none flex flex-col justify-center gap-2 p-2 border rounded-lg shadow-sm">
                <h3 className="font-bold">{clearance.product?.description}</h3>
                <br />
                <picture className="aspect-ratio aspect-[3by2] max-w-60 flex justify-center">
                <img
                    className="max-h-52 object-cover"
                    src={clearance.product.image}
                    alt={clearance.product.description}
                    style={{ display: clearance.product.image ? "block" : "none" }} // Display only if image exists
                  />
                </picture>
                <p>Før pris: {clearance.offer.originalPrice} kr</p>
                <p className="font-medium">
                  Nedsat pris: {clearance.offer.newPrice} kr
                </p>
                {clearance.offer?.endTime && (
                  <p>
                    Udløbsdato:{" "}
                    {new Date(clearance.offer?.endTime).toLocaleDateString(
                      "da-DK"
                    )}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default StoreProductList;
