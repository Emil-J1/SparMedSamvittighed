"use client";

import { useFormState } from "react-dom";
import loginAction from "./loginAuction";
import Link from "next/link";

export default function Login() {
  const [error, formAction] = useFormState(loginAction, undefined);

  return (
    <section className="flex flex-col items-center justify-center h-screen w-screen bg-[url('https://images.pexels.com/photos/4113922/pexels-photo-4113922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
      <div className="p-10 rounded-2xl w-full max-w-md flex flex-col items-center bg-white max-sm:w-4/5 text-center">
        <h1 className="text-3xl font-bold mb-8 text-green-800">Spar med samvittighed</h1>
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Login</h2>
        <form action={formAction} className="flex flex-col space-y-4 w-4/5 gap-2">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="password"
            placeholder="Kodeord"
            name="password"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-white hover:text-green-500 transition ease-in-out duration-300 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline self-center border w-40"
          >
            Login
          </button>
        </form>

        {error && <p className="mt-4 text-red-500">{error}</p>}

        <Link
          href="/register"
          className="flex flex-col items-center justify-center w-40"
        >
          <button className="bg-white hover:bg-gray-800 hover:text-white transition ease-in-out duration-300 text-gray-800 font-bold mt-6 py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline self-center border border-black w-full">
            Registrer dig
          </button>
        </Link>
      </div>
    </section>
  );
}
