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
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="flex justify-center text-3xl pb-12">Butikker</h1>
      <Searchbar onSearch={handleSearch} />
      {zipCode ? <StoreList zipCode={zipCode} /> : <StoreList zipCode='9000' />}
    </div>
  );
}
