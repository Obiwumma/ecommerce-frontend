// src/components/Header.tsx
"use client"; // Needs to be client so it can react to Zustand changes

import Link from 'next/link';
import { useCartStore } from '../store/cartStore';

export default function Header() {
  // 1. We connect to the store, but this time we grab the 'items' array instead of the addItem function!
  const items = useCartStore((state) => state.items);

  // 2. We calculate the total number of items in the cart.
  // (We use .reduce to add up the quantities, so if you have 3 mugs, it shows '3' not '1')
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        
        {/* The Store Logo */}
        <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter">
          STOREFRONT.
        </Link>

        {/* The Cart Icon & Badge */}
        <div className="relative flex items-center cursor-pointer">
          <span className="text-3xl">🛒</span>
          
          {/* We only show the red notification bubble if there is actually something in the cart */}
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full animate-bounce">
              {totalItems}
            </span>
          )}
        </div>

      </div>
    </header>
  );
}