/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

// 1. Define the TypeScript shape of our data
interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  imageUrl: string;
  stockQuantity: number;
}

// 2. Create a helper function to fetch data from our Express backend
async function getProducts() {
  // We use cache: 'no-store' so Next.js always fetches fresh data from our database
  const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();
  // Remember our backend sends { message: "...", productsList: [...] }
  return data.productsList as Product[]; 
}

// 3. Our main Page component (Notice it is an 'async' function!)
export default async function Home() {
  const products = await getProducts();

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Latest Products</h1>
      
      {/* Tailwind CSS Grid: 1 column on mobile, 3 columns on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* We map through the array and create a card for each product */}
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 line-clamp-2 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">${product.price}</span>
                <span className="text-sm text-gray-500">{product.stockQuantity} in stock</span>
              </div>
            </div>
          </div>
          </Link>
        ))}

      </div>
    </main>
  );
}