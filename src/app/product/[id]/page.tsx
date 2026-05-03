/* eslint-disable @next/next/no-img-element */
import { error } from 'console';
import Link from 'next/link';

// 1. We define the blueprint again so TypeScript is happy
interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  imageUrl: string;
  stockQuantity: number;
}

// 2. Build the fetcher function
async function getSingleProduct(id: string) {
  // YOUR TURN: What is the exact URL to fetch from your new backend route?
  const res = await fetch(`http://localhost:3000/api/products/${id}`, { cache: 'no-store' });
  
  if (!res.ok) {
    // If the backend returns a 404, we catch it here
    return null
  }

  const data = await res.json();
  // Remember what you named the key in your backend response!
  return data.product as Product; 
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // 3. Call your fetcher function
  const product = await getSingleProduct(id);

  // 4. Handle the 404 case gracefully on the frontend
  if (!product) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-2xl font-bold">Product not found 🕵️‍♂️</h1>
        <Link href="/" className="text-blue-500 underline mt-4 block">Go back home</Link>
      </main>
    );
  }

  // 5. Build the UI
  return (
    <main className="p-8 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-500 mb-8 inline-block hover:underline">
        &larr; Back to all products
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        {/* YOUR TURN: Render the product.imageUrl here using an <img> tag */}
        <img src={product.imageUrl} alt={product.title} className="w-full rounded-xl shadow-lg object-cover" />
        
        <div>
          {/* YOUR TURN: Render the product.title inside an <h1> tag */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.title}</h1>
          
          {/* YOUR TURN: Render the product.price inside a <p> tag */}
          <p className="text-2xl font-bold text-green-600 mb-6">{product.price}</p>
          
          {/* YOUR TURN: Render the product.description inside a <p> tag */}
          <p className="text-lg text-gray-700 leading-relaxed" >{product.description}</p>
          
          <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full font-bold">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}