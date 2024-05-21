"use client";
import React, { useState, useEffect } from "react";

interface StoreData {
  store: {
    name: string;
    id: string;
    distance_km: number;
    address: {
      city: string;
      street: string;
      zip: string;
    };
    hours: {
      close: string;
      closed: boolean;
      open: string;
      opened: boolean;
      date: string;
    }[];
  };
}

export default function Stores() {
  const [storeData, setStoreData] = useState<StoreData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "034a1ccb-ee77-48b1-a842-31d34068d90a"; // Replace with your actual bearer token
        const response = await fetch(
          `https://api.sallinggroup.com/v1/food-waste/?geo=57.020893,9.884766&radius=5`,
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
        console.log("Fetched data:", data); // Log the data here
        setStoreData(data); // Ensure data is in the expected format
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
  }, []);

  if (isLoading) {
    return (
      <section className="flex flex-col justify-center items-center">
        <h3 className="text-xl mb-5">Indlæser</h3>
      </section>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="py-10 px-10 text-gray-700">
      <div className="grid lg:grid-cols-3 gap-4">
        {storeData &&
          storeData.length > 0 &&
          storeData.map((store) => (
            <div
              key={store.store.id}
              className="bg-white text-black py-10 p-4 border rounded-lg"
            >
              <a href={`store/${store.store.id}/`}>

              <h1 className="flex justify-center text-xl mb-4">
                {store.store.name}
              </h1>
              <h3>
                {store.store.address.city} - {store.store.address.zip}
              </h3>
              <h3>{store.store.address.street}</h3>
              <div className="flex justify-between pt-5">
                <h3>Åbent: {store.store.hours[0]?.closed ? "Nej" : "Ja"}</h3>
                <h3>Åbningstider: {store.store.hours[0]?.open || "N/A"}</h3>
              </div>
              <h3>{store.store.distance_km} km</h3>
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
