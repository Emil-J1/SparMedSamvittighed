"use client"
import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function Fexample() {
    console.log('Hej');
    const [example, setExample] = useState<any>(null);
    useEffect(() => {
        axios.get('http://localhost:3000/api/example')
            .then(res => setExample(res.data.message.clearances)).catch(err => console.log(err));
    });

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Products</h1>
            {example && example.length > 0 ? (
                example.map((entry, index) => (
                    <div key={index}>
                        <p>{entry.title}</p>
                        <p>{entry.description}</p>
                    </div>
                ))
            ) : (
                <p>No products found!</p>
            )}
        </div>
    );
}

