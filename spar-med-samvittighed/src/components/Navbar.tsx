import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between">
      <div>
        <h1>Spar med Samvittighed</h1>
      </div>
      <div className="space-x-6">
        <Link href="/profile">Profile</Link>
        <Link href="/stores">Søg</Link>
      </div>
    </nav>
  );
}
