export default function Searchbar() {
  return (
    <div className="flex justify-center items-center mb-10 h-12 w-4/12	">
      <input
        type="text"
        placeholder="Søg efter produkter"
        className="border border-gray-400 p-2 rounded-lg text-black h-full w-full"
      />
      <button className="bg-green-600 hover:bg-green-500 text-black p-2 rounded-lg ml-2 h-full">
        <a className="flex flex-row items-center h-full" href="">
          Søg
          <img
            className="h-full"
            src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
            alt="Søge-ikon"
          />
        </a>
      </button>
    </div>
  );
}
