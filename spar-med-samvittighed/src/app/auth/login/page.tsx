"use client";

import { useFormState } from "react-dom";
import loginAction from "./loginAuction";
import Link from "next/link";

export default function Login() {
  const [error, formAction] = useFormState(loginAction, undefined);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-black">
      <h1 className="text-4xl font-bold mb-8">Login</h1>
      <form action={formAction} className="flex flex-col space-y-4 w-1/5">
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="bg-green-500 hover:font-medium text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full self-center"
        >
          Login
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      <Link href="/register" className="flex flex-col items-center justify-center w-1/6">
        <button className="bg-black hover:font-medium text-white font-bold mt-6 py-2 px-4 rounded focus:outline-none focus:shadow-outline self-center border border-white w-full">
          Registrer dig
        </button>
      </Link>
    </section>
  );
}
