"use client";

import Link from 'next/link';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const { user, logout } = useAuthStore();

  // 🚨 WE BROUGHT THE SMART MATH OVER FROM THE OLD HEADER!
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout(); 
    window.location.href = '/login'; 
  };

  return (
    <nav className="bg-black text-white p-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-extrabold tracking-widest uppercase">
          LOCKERROOM.
        </Link>

        {/* RIGHT SIDE NAVIGATION */}
        <div className="flex items-center space-x-6">
          
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">
                Welcome, <span className="font-bold text-white">{user.name}</span>
              </span>
              <button 
                onClick={handleLogout}
                className="text-sm font-bold border border-white px-3 py-1 hover:bg-white hover:text-black transition-colors"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-sm font-bold hover:text-gray-300 transition-colors">
                LOG IN
              </Link>
            </div>
          )}

          {/* CART BUTTON */}
          <Link href="/cart" className="flex items-center space-x-2">
            <span>🛒</span>
            {/* 🚨 NOW WE USE totalItems INSTEAD OF items.length */}
            <span className="bg-white text-black text-xs font-bold px-2 py-1 rounded-full">
              {totalItems}
            </span>
          </Link>
          
        </div>
      </div>
    </nav>
  );
}