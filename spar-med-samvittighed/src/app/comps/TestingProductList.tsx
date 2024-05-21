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
  
  address: {
    city: string;
    street: string;
    zip: string;
  };
  
  brand: string;
}

const TestingProductList: React.FC<{ searchTerm?: string }> = ({ searchTerm }) => {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchData = async () => {
      try {
        const token = "e7444fc7-5a53-4204-9e94-ff62baab957f"; // Replace with your actual bearer token
        const response = await fetch(
          `https://api.sallinggroup.com/v2/stores/?zip=${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
                // CORS preflight request handling (optional)
            mode: 'cors', // Indicate CORS mode
            cache: 'no-cache', // Disable caching for CORS requests
            credentials: 'same-origin', // Only send cookies for same-origin requests
          }
        );
        console.log('Search term received:', searchTerm);
        if (!response.ok) {
          throw new Error("Kunne ikke finde nogle butikker under dette postnummer.");
        }
        const data = await response.json();
        setStoreData(data);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch request cancelled');
        } else {
          setError(error as Error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  // Cancel the fetch request if the component unmounts
  return () => {
    abortController.abort();
  };
}, [searchTerm]); // Re-run effect when searchTerm changes

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
      {/* Check if storeData exists and has clearances before mapping */}
      {storeData?.address?.city && (
        <>
      <h2 className="text-2xl font-bold mb-1">Butikker under postnummer</h2>
        <h2 className="text-1xl mb-12">{storeData?.address?.city}</h2>
        <h2 className="text-1xl mb-12">{storeData?.address?.street}</h2>
        </>
      )}
    </>
    // <>
    //   <h2 className="text-2xl font-bold mb-1">{storeData?.store?.name}</h2>
    //   <h2 className="text-1xl mb-12">{storeData?.store?.address.street}</h2>
    //   {/* Check if storeData exists and has clearances before mapping */}
    //   {storeData?.clearances && (
    //     <>
    //       <h2 className="text-xl font-bold mb-4">Nedsatte produkter:</h2>
    //       <ul className="list-disc space-y-2">
    //         {/* Map through clearances and render product details */}
    //         {storeData.clearances.map((clearance, index) => (
    //           <li key={index} className="list-none flex flex-col justify-center gap-2 p-2 border rounded-lg shadow-sm">
    //             <h3 className="font-bold">{clearance.product?.description}</h3>
    //             <br />
    //             <picture className="aspect-ratio aspect-[3by2] max-w-60 flex justify-center">
    //             <img
    //                 className="max-h-52 object-cover"
    //                 src={clearance.product?.image}
    //                 alt={clearance.product?.description}
    //                 style={{ display: clearance.product?.image ? "block" : "none" }} // Display only if image exists
    //               />
    //             </picture>
    //             <p>Før pris: {clearance.offer?.originalPrice} kr</p>
    //             <p className="font-medium">
    //               Nedsat pris: {clearance.offer?.newPrice} kr
    //             </p>
    //             {clearance.offer?.endTime && (
    //               <p>
    //                 Udløbsdato:{" "}
    //                 {new Date(clearance.offer?.endTime).toLocaleDateString(
    //                   "da-DK"
    //                 )}
    //               </p>
    //             )}
    //           </li>
    //         ))}
    //       </ul>
    //     </>
    //   )}
    // </>
  );
};

export default TestingProductList;