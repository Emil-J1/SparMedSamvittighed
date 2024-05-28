"use client";
import React, { useState, useEffect } from "react";

interface StoreData {
  store: {
    name: string;
    id: string;
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

interface StoreListProps {
  zipCode: string;
}

export default function StoreList({ zipCode }: StoreListProps) {
  const [storeData, setStoreData] = useState<StoreData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "034a1ccb-ee77-48b1-a842-31d34068d90a"; // Replace with your actual bearer token
        const response = await fetch(
          `https://api.sallinggroup.com/v1/food-waste/?zip=${zipCode}`,
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
        console.log("Fetched data:", data);
        setStoreData(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [zipCode]);

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
    <section className="py-10 px-10 w-screen">
      <div className="grid lg:grid-cols-3 gap-6">
        {storeData &&
          storeData.length > 0 &&
          storeData.map((store) => (
            <article
              key={store.store.id}
              className="bg-white text-gray-800 py-10 p-4 border rounded-lg"
            >
              <a href={`stores/${store.store.id}/`}>
                <h2 className="flex justify-center text-xl font-bold mb-4">
                  {store.store.name}
                </h2>
                <h3>
                  {store.store.address.city} - {store.store.address.zip}
                </h3>
                <h3>{store.store.address.street}</h3>
                <div className="flex justify-between pt-5">
                  <h3>
                    Åbningstider: <br /> {new Intl.DateTimeFormat("da-DK", {
                      weekday: "long", 
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(store.store.hours[0]?.open)) ||
                      "N/A"}{" "}<br />
                    {new Intl.DateTimeFormat("da-DK", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(store.store.hours[0]?.open)) ||
                      "N/A"}{" "}
                    <br />
                    {new Intl.DateTimeFormat("da-DK", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(store.store.hours[0]?.close)) || "N/A"}
                  </h3>
                </div>
              </a>
            </article>
          ))}
      </div>
    </section>
  );
}
