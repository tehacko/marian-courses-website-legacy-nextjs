'use client';

import { useState } from "react";
import Link from "next/link";

export default function LoginForm({ children, onLoginPress }) {
  const [formState, setFormState] = useState({ errors: null, message: null });
  const handleLogin = async (e) => {
    e.preventDefault();  
  

    //  more
  }
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
        <button type="submit">Pžihlásit se</button>
      </p>

      <p>
        <Link href="/login">Přihlásit se za pomocí Google.</Link>
      </p>
    </form>
      </div>
    )
  }