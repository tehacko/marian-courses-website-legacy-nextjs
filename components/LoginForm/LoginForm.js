'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Added for redirection


export default function LoginForm({ children, onLoginPress }) {
  const [formState, setFormState] = useState({ errors: null, message: null });
  const [googleError, setGoogleError] = useState(null); // ✅ State for Google login error
  const router = useRouter(); // ✅ Added for navigation

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error') === 'google') {
      setGoogleError('Google login failed. Please try again.');
    }
  
    // Check if we have a successful response
    if (urlParams.get('success') === 'true') {
      // Redirect after successful login (this could be stored in state or received from backend)
      router.push("/my-courses");
    }
  }, []);

  const handleGoogleLogin = () => {
    // Redirect to Google's OAuth login page
    window.location.href = "http://localhost:5000/auth/google";
  };
  
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
        {/* Added Google login button, redirects to backend auth route */}
        <button 
            type="button" 
            onClick={handleGoogleLogin} // ✅ Trigger the Google login process
          >
            Registrovat / Přihlásit se přes Google
          </button>
      </p>
    </form>
      </div>
    )
  }