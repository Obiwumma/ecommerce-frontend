/* eslint-disable @next/next/no-img-element */
// src/app/cart/page.tsx
"use client";

import Link from 'next/link';
import { useCartStore } from '../store/cartStore';

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  // YOUR CHALLENGE: Calculate the total price of everything in the cart.
  // Hint: You can use the .reduce() method just like we did for the total items in the Header!
  // Remember that price is a string in our database, so you'll need to wrap it in Number(item.price)
  const totalPrice = items.reduce((sum, item) => sum +  Number(item.price), 0); 

  if (items.length === 0) {
    return (
      <main className="p-8 max-w-4xl mx-auto text-center mt-20">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty 😢</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Go back to shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-4xl mx-auto mt-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        {/* Loop through cart items */}
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b py-4 last:border-b-0">
            <div className="flex items-center gap-4">
              <img src={item.imageUrl} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-bold text-lg">${Number(item.price) * item.quantity}</p>
          </div>
        ))}
      </div>

      {/* Checkout Section */}
      <div className="bg-gray-50 rounded-xl p-6 flex items-center justify-between border">
        <div>
          <p className="text-gray-500">Total Amount</p>
          <p className="text-3xl font-black">${totalPrice.toFixed(2)}</p>
        </div>
        <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </main>
  );
}