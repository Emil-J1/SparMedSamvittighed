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

const ProductList: React.FC = () => {
    // State to store the products fetched from the API
    const [Products, setProducts] = useState<Clearance[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    // Function to fetch products from the API
    const fetchProducts = async () => {
        try {
            setLoading(true);
            // Fetch products from the API with pagination
            const response = await fetch(`your_api_endpoint?page=${page}&limit=20`);
            const data = await response.json();
            // Update the products state with the fetched data
            setProducts(prevProducts => [...prevProducts, ...data.clearances]);
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect hook to fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
    }, []); // Empty dependency array ensures useEffect runs only once on mount
    
    // Function to load more products
    const loadMoreProducts = () => {
        fetchProducts();
    };

    return (
        <section>
            <h2>Product List</h2>
            <ul>
                {Products.map((product, index) => (
                    <li key={index}>
                        <h3>{product.product.description}</h3>
                        <p>{product.product.categories.en}</p>
                        <p>{product.offer.currency} {product.offer.newPrice}</p>
                    </li>    
                ))}
            </ul>
            {loading && <p>Loading...</p>}
            <button onClick={loadMoreProducts} disabled={loading}>Load More</button>
        </section>
    )
}

export default ProductList;
