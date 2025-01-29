// components/Header.js
import "./Header.module.css"; // Adjust the path to match your folder structure
import Link from "next/link";
import Image from 'next/image';
import MariaPicture from '../app/assets/Maria.png';

export default function Header() {
  return (
    <header>
      <div>
      <Image src={MariaPicture} className="logo maria" alt='Maria logo'/>
      <nav>
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/about" className="hover:underline">About</Link>
        <Link href="/courses" className="hover:underline">Courses</Link>
        <Link href="/login" className="hover:underline">Login</Link>
        <Link href="/register" className="hover:underline">Register</Link>
      </nav>
      </div>
    </header>
  );
}