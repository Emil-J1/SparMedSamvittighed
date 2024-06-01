import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-screen flex justify-between text-gray-800 px-10">
      <h1 className="font-bold">Spar med Samvittighed</h1>
      <Link href="/stores">Søg</Link>
    </nav>
  );
}
