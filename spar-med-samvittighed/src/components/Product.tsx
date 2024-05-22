"use client";
import React, { useState, useEffect } from 'react';

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
        const token = '034a1ccb-ee77-48b1-a842-31d34068d90a'; // Replace with your actual bearer token
        const response = await fetch(`https://api.sallinggroup.com/v1/food-waste/${storeId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        
        // Find the specific product in the response
        const specificProduct = result.clearances.find((clearance: Clearance) => clearance.product.ean === productId);
        
        setData(specificProduct);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [storeId, productId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No product found.</div>;
  }

  return (
    <article className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl p-2">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="w-full object-cover md:w-48" src={data.product.image} alt={data.product.description} />
        </div>
        <div className="p-8 text-gray-700">
          <h3 className="text-2xl font-bold mb-2">{data.product.description}</h3>
          <p className="mb-4">Kategori: {data.product.categories.en}</p>
          <p><b>Pris:</b> {data.offer.newPrice} {data.offer.currency}</p>
          <p><b>Gammel pris:</b> {data.offer.originalPrice} {data.offer.currency}</p>
          <p><b>Besparelse:</b>{data.offer.discount} {data.offer.currency} ({data.offer.percentDiscount}%)</p>
          <p><b>Antal tilbage:</b> {data.offer.stock}</p>
          <p><b>Sat på tilbud den:</b> {new Date(data.offer.startTime).toLocaleString()}</p>
          <p><b>Tilbudet slutter:</b> {new Date(data.offer.endTime).toLocaleString()}</p>
          <p><b>Tilbuddet blev sidst opdateret den:</b> {new Date(data.offer.lastUpdate).toLocaleString()}</p>
        </div>
      </div>
    </article>
  );
};

export default Product;

