// components/Header.js
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/about" className="hover:underline">About</Link>
      </nav>
    </header>
  );
}