import { CartStore } from "@/interface/cart.interface";
import { ProductItem } from "@/interface/product.interface";
import { create } from "zustand";

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  subtotal: 0,
  itemCount: 0,

  addProduct: (product: ProductItem, quantity: number = 1) => {
    set((state) => {
      const items = [...state.items];
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        items.push({ ...product, quantity });
      }

      const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const itemCount = items.reduce((count, item) => count + item.quantity, 0);

      return { items, subtotal, itemCount };
    });
  },

  incrementQuantity: (productId: string) => {
    set((state) => {
      const items = [...state.items];
      const existingItem = items.find((item) => item.id === productId);

      if (!existingItem) return state;

      existingItem.quantity += 1;
      const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const itemCount = items.reduce((count, item) => count + item.quantity, 0);

      return { items, subtotal, itemCount };
    });
  },

  decrementQuantity: (productId: string) => {
    set((state) => {
      const items = [...state.items];
      const existingItem = items.find((item) => item.id === productId);

      if (!existingItem) return state;

      existingItem.quantity -= 1;
      const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const itemCount = items.reduce((count, item) => count + item.quantity, 0);

      return { items, subtotal, itemCount };
    });
  },

  removeProduct: (productId: string) => {
    set((state) => {
      const items = [...state.items];
      const existingItemIndex = items.findIndex(
        (item) => item.id === productId
      );

      if (existingItemIndex === -1) return state;

      const item = items[existingItemIndex];
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        items.splice(existingItemIndex, 1);
      }

      const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const itemCount = items.reduce((count, item) => count + item.quantity, 0);

      return { items, subtotal, itemCount };
    });
  },

  updateQuantity: (
    productId: string,
    newQuantity: number,
    maxQuantity = 99
  ) => {
    set((state) => {
      // Create a new copy of items array
      const items = [...state.items];
      const existingItem = items.find((item) => item.id === productId);

      if (!existingItem) return state;

      // Ensure quantity is within valid range
      const validatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));

      if (validatedQuantity <= 0) {
        // Remove item if quantity is 0 or negative
        const index = items.indexOf(existingItem);
        items.splice(index, 1);
      } else {
        // Update quantity if within valid range
        existingItem.quantity = validatedQuantity;
      }

      // Calculate new totals
      const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const itemCount = items.reduce((count, item) => count + item.quantity, 0);

      return { items, subtotal, itemCount };
    });
  },

  clearCart: () => {
    set({ items: [], subtotal: 0, itemCount: 0 });
  },

  calculateSubtotal: () => get().subtotal,
  calculateItemCount: () => get().itemCount,
}));

export default useCartStore;
