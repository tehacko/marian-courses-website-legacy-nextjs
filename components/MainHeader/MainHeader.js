// components/Header.js
import classes from "./MainHeader.module.css"; // Adjust the path to match your folder structure
import Link from "next/link";
import Image from 'next/image';
import MariaPicture from '@/assets/Maria.png';
import MainHeaderBackground from "./MainHeaderBackground";

export default function MainHeader() {
  return (
    <>
    <MainHeaderBackground />
      <header className={classes.header}>
        <div>
          <Image src={MariaPicture} className={classes.logo} alt='Website logo' priority />
          <nav className={classes.nav}>
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/courses" className="hover:underline">Courses</Link>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/register" className="hover:underline">Register</Link>
          </nav>
        </div>
      </header>
    </>
  );
}