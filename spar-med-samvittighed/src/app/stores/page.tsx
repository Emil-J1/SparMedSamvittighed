"use client"
import React, { useState } from "react";
import Searchbar from "@/components/Searchbar";
import StoreList from "@/components/StoreList";

export default function StoreListPage() {
  const [zipCode, setZipCode] = useState<string | null>(null);

  const handleSearch = (zipCode: string) => {
    setZipCode(zipCode);
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <h1 className="text-3xl font-bold mb-12 text-green-800">Butikker</h1>
      <Searchbar onSearch={handleSearch} />
      {zipCode ? <StoreList zipCode={zipCode} /> : <StoreList zipCode='9000' />}
    </section>
  );
}
