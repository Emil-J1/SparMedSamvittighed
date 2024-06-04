"use client";
import React, { useState } from "react";
import Searchbar from "@/components/Searchbar";
import StoreList from "@/components/StoreList";
import Navbar from "@/components/Navbar";

export default function StoreListPage() {
  const [zipCode, setZipCode] = useState<string | null>(null);

  const handleSearch = (zipCode: string) => {
    setZipCode(zipCode);
  };

  return (
    <>
      <section className="flex min-h-screen flex-col items-center justify-between pt-5 pb-24 bg-stone-100">
      <Navbar/>
        <h1 className="text-3xl font-bold pt-10 mb-12 text-black">Butikker</h1>
        <Searchbar onSearch={handleSearch} />
        {zipCode ? (
          <StoreList zipCode={zipCode} />
        ) : (
          <StoreList zipCode="9000" />
        )}
      </section>
    </>
  );
}
