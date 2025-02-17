'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Added for redirection


export default function LoginForm({ children, onLoginPress }) {
  const [formState, setFormState] = useState({ errors: null, message: null });
  const router = useRouter(); // ✅ Added for navigation
  
  const handleLogin = async (e) => {
    e.preventDefault();  
    const email = e.target.email.value; // ✅ Captures email on submit
    const password = e.target.password.value; // ✅ Captures password on submit
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      credentials: "include", // ✅ Ensure cookies are included
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }), // ✅ Use `email` to match backend
    });
    const data = await res.json();
      if (data.success) {
        router.push("/my-courses"); // ✅ Redirects on successful login
      } else {
        setFormState({ errors: "Invalid credentials", message: null }); // ✅ Show error message
      }
  };

  return (
      <div id ="login-box">
        <form id="auth-form" onSubmit={handleLogin}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      
      <p>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" required />
      </p>

      <p>
        <label htmlFor="password">Heslo: </label>
        <input type="password" name="password" id="password" required />
      </p>

      {formState.errors && (
        <p style={{ color: 'red' }}>{formState.errors}</p>
      )}

      {formState.message && (
        <p style={{ color: 'green' }}>{formState.message}</p>
      )}

      <p>
        <button type="submit">Přihlásit se</button>
      </p>

      <p>
        <Link href="/login">Přihlásit se za pomocí Google.</Link>
      </p>
    </form>
      </div>
    )
  }