"use client"
import { useState, useEffect } from 'react';

interface ProductPageProps {
  productId: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ productId }) => {
  const [data, setData] = useState<Clearance | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = '034a1ccb-ee77-48b1-a842-31d34068d90a';
        const storeId = 'd6abf195-312b-4818-8933-bda8ecdd9fbd'; // The specific store ID

        const response = await fetch(`https://api.sallinggroup.com/v1/food-waste/${storeId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.json();
        const specificProduct = result.clearances.find((clearance: Clearance) => clearance.product.ean === productId);

        setData(specificProduct);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup function to cancel fetch request if component unmounts
    return () => {
      // Your cleanup code here, for example, cancelling any ongoing requests
    };
  }, [productId]); // Fetch data whenever productId changes

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
                <p className="mb-4">Kategori: {data.product.categories.da}</p>
                <p><b>Pris:</b> {data.offer.newPrice} {data.offer.currency}</p>
                <p><b>Gammel pris:</b> {data.offer.originalPrice} {data.offer.currency}</p>
                <p><b>Besparelse:</b>{data.offer.discount} {data.offer.currency} ({data.offer.percentDiscount}%)</p>
                <p><b>Antal tilbage:</b> 2</p>
                <p><b>Sat på tilbud den:</b> {new Date(data.offer.startTime).toLocaleString()}</p>
                <p><b>Tilbudet slutter:</b> {new Date(data.offer.endTime).toLocaleString()}</p>
                <p><b>Tilbuddet blev sidst opdateret den:</b> {new Date(data.offer.lastUpdate).toLocaleString()}</p>
            </div>
        </div>
    </article>
    );
};

export default ProductPage;
