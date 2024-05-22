"use client"
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

const MyComponent: React.FC = () => {
    const [data, setData] = useState<Clearance[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = '${{ secrets.SALLINGGROUP }}'; // Replace 'YOUR_BEARER_TOKEN_HERE' with your actual bearer token
                const response = await fetch('https://api.sallinggroup.com/v1/food-waste/?zip=9000&radius=5', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setData(result);
                console.log(result)
            } catch (error:any) {
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
    }, []); // Empty dependency array means this effect runs only once after the initial render

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {data.map((entry, index) => {
                return entry.clearances.map((clearance, innerIndex) => {
                    return (
                        <li key={`${index}-${innerIndex}`}>
                            <h3>{clearance.product && clearance.product.description}</h3>
                            {/* Render other product details here if needed */}
                        </li>
                    );
                });
            })}
        </>
    );
    
    
};

export default MyComponent;
