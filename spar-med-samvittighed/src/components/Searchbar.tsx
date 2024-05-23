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
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center mb-10 h-12 w-full"
    >
      <input
        type="text"
        placeholder="Postnummer"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(event) => {
          const pattern = /[0-9]/;
          if (
            !pattern.test(event.key) &&
            event.key !== "Backspace" &&
            event.key !== "Delete"
          ) {
            event.preventDefault();
          }
        }}
        onInput={(event) => {
          if ((event.target as HTMLInputElement).value.length > 4) {
            (event.target as HTMLInputElement).value = (
              event.target as HTMLInputElement
            ).value.slice(0, 4);
          }
        }}
        className="border border-gray-400 p-2 rounded-lg text-black h-full w-full"
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-500 text-black p-2 rounded-lg ml-2 h-full flex flex-row items-center"
      >
        <img
          className="h-full"
          src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
          alt="Søge-ikon"
        />
      </button>
    </form>
  );
};

export default Searchbar;
