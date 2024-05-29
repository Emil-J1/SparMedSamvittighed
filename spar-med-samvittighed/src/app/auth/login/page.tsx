"use client";

import { useFormState } from "react-dom";
import loginAction from "./loginAuction";

export default function Login() {
  const [error, formAction] = useFormState(loginAction, undefined);

  return (
    <section className="flex flex-col justify-center items-center py-20">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form action={formAction} className="flex flex-col space-y-4 w-1/3">
        <input type="email" placeholder="Email" name="email" className="border border-gray-300 p-2 rounded" />
        <input type="password" placeholder="Password" name="password" className="border border-gray-300 p-2 rounded" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded w-1/2 self-center">Login</button>
      </form>

      {error && <p className="text-red-500">{error}</p>}
    </section>
  );
}