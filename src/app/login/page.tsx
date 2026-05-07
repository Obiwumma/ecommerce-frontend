// src/app/login/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
  const router = useRouter();
  // Bring in the 'login' function from our Zustand memory!
  const setAuthData = useAuthStore((state) => state.login);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to login');
      }

      // 🚨 THE CRITICAL MOMENT 🚨
      // We pass the user details and the JWT to Zustand. 
      // Zustand saves it to memory AND LocalStorage instantly.
      setAuthData(data.user, data.token);

      // Teleport the user back to the homepage to shop!
      router.push('/');
      
    } catch (err: unknown) {
      // We check: Is this actually a standard JavaScript Error object?
      if (err instanceof Error) {
        setError(err.message);
      } else {
        // If the server threw something weird like a string or number, we use a fallback
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 shadow-sm">
        <h2 className="text-3xl font-extrabold text-black text-center mb-6 uppercase tracking-tight">
          Enter Lockerroom
        </h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 mb-4 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white font-bold py-4 mt-4 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            {loading ? 'AUTHENTICATING...' : 'LOG IN'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Need an account?{' '}
          <Link href="/register" className="text-black font-bold underline hover:text-gray-800">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}