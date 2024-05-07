export default function Login() {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
        <div className="max-w-md w-full bg-white rounded shadow-md p-6">
          <h1>Register</h1>
          <h1 className="text-3xl font-bold mb-4 text-gray-700 text-center">Register</h1>
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 pl-10 text-sm text-gray-700"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 pl-10 text-sm text-gray-700 mt-4"
            />
          </div>
          <button className="btn mt-8 w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </div>
      </div>
    );
}