"use client";
import React, { useState } from "react";

interface SearchbarProps {
  onSearch: (zipCode: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center mb-10 h-12 w-full">
      <input
        type="text"
        placeholder="Søg efter produkter"
        value={inputValue}
        onChange={handleInputChange}
        className="border border-gray-400 p-2 rounded-lg text-black h-full w-full"
      />
      <button type="submit" className="bg-green-600 hover:bg-green-500 text-black p-2 rounded-lg ml-2 h-full">
        <div className="flex flex-row items-center h-full">
          Søg
          <img
            className="h-full"
            src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
            alt="Søge-ikon"
          />
        </div>
      </button>
    </form>
  );
};

export default Searchbar;
