import Link from "next/link";
import logoutAction from "../serveractions/auth/logoutaction";

export default function Navbar() {


  return (
    <nav className="w-screen flex text-green-800 justify-evenly">
      <h1 className="font-bold">Spar med Samvittighed</h1>
      <Link href="/stores">Søg</Link>
      <form action={logoutAction}>
      <button type="submit">Logout</button>
    </form>
    </nav>
  );
}
