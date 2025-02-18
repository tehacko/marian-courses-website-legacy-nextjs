'use client';

import classes from '../../page.module.css';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MyCoursesPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("http://localhost:5000/auth/status", {
          credentials: "include",
        });
        const data = await res.json();

        if (!data.authenticated) {
          router.replace("/login");
        } else {
          setUser(data.email);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
      <>
    <header className={classes.header}>
      <h1>
        Zde jsou <span className={classes.highlight}>vaše oblíbené kurzy</span>
      </h1>
    </header>
    <main className={classes.main}>
      <p>Pěkně jeden po druhém.</p>
    </main>
  </>
  );
}