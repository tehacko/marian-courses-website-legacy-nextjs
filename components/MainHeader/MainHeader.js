import classes from "./MainHeader.module.css";
import Image from 'next/image';
import MariaPicture from '@/assets/Maria.png';
import MainHeaderBackground from "./MainHeaderBackground";
import ClientNavLink from "./ClientNavLink";

export default function MainHeader() {
  return (
    <>
    <MainHeaderBackground />
      <header className={classes.header}>
        <div>
          <Image src={MariaPicture} className={classes.logo} alt='Website logo' priority />
          <nav className={classes.nav}>
            <ClientNavLink href="/">Home</ClientNavLink>
            <ClientNavLink href="/about">About</ClientNavLink>
            <ClientNavLink href="/courses">Courses</ClientNavLink>
            <ClientNavLink href="/login">Login</ClientNavLink>
            <ClientNavLink href="/register">Register</ClientNavLink>
          </nav>
        </div>
      </header>
    </>
  );
}