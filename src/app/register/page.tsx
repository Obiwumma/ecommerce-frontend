// src/app/register/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  
  // Local state to hold what the user types
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Stop the page from refreshing!
    setLoading(true);
    setError('');

    try {
      // Send the data to your Express backend
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      // If successful, send them to the login page to get their wristband!
      router.push('/login?registered=true');
      
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
          Join Lockerroom
        </h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 mb-4 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full border border-gray-300 p-3 focus:outline-none focus:border-black transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
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
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-black font-bold underline hover:text-gray-800">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}