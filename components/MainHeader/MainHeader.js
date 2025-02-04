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
            <ClientNavLink href="/about">O nás</ClientNavLink>
            <ClientNavLink href="/courses">Nejnovější Kurzy</ClientNavLink>
            <ClientNavLink href="/archive">Všechny kurzy</ClientNavLink>
            <ClientNavLink href="/create-a-course">Vytvořit kurz</ClientNavLink>
            <ClientNavLink href="/login">Přihlášení</ClientNavLink>
            <ClientNavLink href="/register">Registrace</ClientNavLink>
          </nav>
        </div>
      </header>
    </>
  );
}