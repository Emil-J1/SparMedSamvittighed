export default function Favorites() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Favorites</h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-400">
            <img
              src="food1.jpg"
              alt="Food 1"
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">Food 1</h2>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded text-center mx-auto">
              Produkt info
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-400">
            <img
              src="food1.jpg"
              alt="Food 1"
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">Food 1</h2>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded text-center mx-auto">
              Produkt info
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border border-gray-400">
            <img
              src="food1.jpg"
              alt="Food 1"
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">Food 1</h2>
            <p className="text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded text-center mx-auto">
              Produkt info
            </button>
          </div>
          {/* Repeat the same modifications for the other food items */}
        </div>
      </div>
    </div>
  );
}
