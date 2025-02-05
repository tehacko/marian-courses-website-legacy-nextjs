'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { signup } from '@/lib/server-actions';

export default function RegisterForm() {
  const [formState, formAction] = useActionState(signup, {});
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email: </label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Heslo: </label>
        <input type="password" name="password" id="password" />
      </p>
      {formState.errors && (<ul id="form-errors">
        {Object.keys(formState.errors).map((error) => (
          <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>)}
      <p>
        <button type="submit">
          Vytvořit účet
        </button>
      </p>
      <p>
        <Link href="/">Přihlásit se existujícím účtem.</Link>
      </p>
    </form>
  );
}
