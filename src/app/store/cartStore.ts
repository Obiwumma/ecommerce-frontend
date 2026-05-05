// src/store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Define what a single item in our cart looks like 
// (It's exactly like a Product, but we add a 'quantity' field)
export interface CartItem {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
  quantity: number;
}

// 2. Define the shape of our entire Store (the brain)
interface CartState {
  items: CartItem[]; // An array of items in the cart
  addItem: (item: CartItem) => void; // A function to add items
  clearCart: () => void;
}

// 3. Create the actual store
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      // The logic for adding an item
      addItem: (newItem) => set((state) => {
        // Check if the item is already in the cart
        const existingItem = state.items.find((item) => item.id === newItem.id);
        
        if (existingItem) {
          // If it exists, just increase the quantity by 1

          return {
            items: state.items.map((item) =>
              item.id === newItem.id 
                ? { ...item, quantity: item.quantity + 1 } 
                : item
            ),
          };
        }
        // If it's a brand new item, add it to the array with a quantity of 1
        return { items: [...state.items, { ...newItem, quantity: 1 }] };
      }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'ecommerce-cart-storage', // The secret name it uses in the browser's memory
    }
  )
);