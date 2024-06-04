import Link from "next/link";
import logoutAction from "../serveractions/auth/logoutaction";

export default function Navbar() {
  return (
    <nav className="w-screen flex text-green-800 justify-between bg-stone-100">

      <Link className="font-bold py-1 ml-10 max-sm:ml-3" href="/">
        Spar med Samvittighed
      </Link>

      <div className="flex mr-10 max-sm:mr-3 gap-10 max-sm:gap-3">
        <Link
          className="bg-white border border-black hover:bg-black hover:text-white transition ease-in-out duration-300 text-black font-bold py-1 px-4 rounded-xl focus:outline-none focus:shadow-outline self-center"
          href="/stores">
          Søg
        </Link>

        <form action={logoutAction}>
          <button
            className="bg-white border border-black hover:bg-black hover:text-white transition ease-in-out duration-300 text-black font-bold py-1 px-3 rounded-xl focus:outline-none focus:shadow-outline self-center"
            type="submit">
            Logout
          </button>
        </form>

      </div>
    </nav>
  );
}
