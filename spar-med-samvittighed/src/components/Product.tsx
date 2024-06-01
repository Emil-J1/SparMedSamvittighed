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

interface ProductPageProps {
  storeId: string;
  productId: string;
}

const Product: React.FC<ProductPageProps> = ({ storeId, productId }) => {
  const [data, setData] = useState<Clearance | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = "034a1ccb-ee77-48b1-a842-31d34068d90a"; // Replace with your actual bearer token
        const response = await fetch(
          `https://api.sallinggroup.com/v1/food-waste/${storeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();

        // Find the specific product in the response
        const specificProduct = result.clearances.find(
          (clearance: Clearance) => clearance.product.ean === productId
        );

        setData(specificProduct);
      } catch (error: any) {
        setError(
          error instanceof Error
            ? error
            : new Error("Beklager men butikken kunne ikke findes.")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [storeId, productId]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-2xl font-bold mb-5 text-white">Indlæser</h3>
        <Image src="/loading.gif" alt="Indlæser" width={30} height={30} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return (
      <p className="text-2xl font-medium m-4 text-white">
        Produktet kunne ikke findes.
      </p>
    );
  }

  return (
    <article className="flex flex-col items-center justify-center w-screen rounded-2xl w-full max-w-md bg-stone-100 max-sm:w-4/5 text-center my-5">
      <h1 className="w-full text-2xl font-bold mb-4 text-green-800 pt-8">
        {data.product.description}
      </h1>
      <img
        className="max-h-35 max-sm:w-3/5 self-center my-10 max-sm:my-5"
        src={data.product.image}
        alt={data.product.description}
        style={{
          display: data.product.image ? "block" : "none",
        }}
      />
      <div className="p-8 text-gray-800 text-left flex flex-col gap-2">
        <p
          className="mb-4"
          style={{
            display: data.product.categories.en ? "block" : "none",
          }}
        >
          {" "}
          <b>Kategori:</b> {data.product.categories.en}
        </p>
        <p>
          <b>Pris:</b> {data.offer.newPrice} {data.offer.currency}
        </p>
        <p>
          <b>Gammel pris:</b> {data.offer.originalPrice} {data.offer.currency}
        </p>
        <p>
          <b>Besparelse:</b>
          {data.offer.discount} {data.offer.currency} (
          {data.offer.percentDiscount}%)
        </p>
        <p
          style={{
            display: data.offer.stock <= 70 ? "block" : "none",
          }}
        >
          <b>Antal tilbage:</b> {data.offer.stock}
        </p>
        <p>
          <b>Sat på tilbud den:</b>{" "}
          {new Date(data.offer.startTime).toLocaleDateString("da-DK")}
        </p>
        <p>
          <b>Tilbudet slutter:</b>{" "}
          {new Date(data.offer.endTime).toLocaleDateString("da-DK")}
        </p>
      </div>
    </article>
  );
};

export default Product;
