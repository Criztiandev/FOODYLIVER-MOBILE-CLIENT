import { CartStore } from "@/interface/cart.interface";
import { ProductItem } from "@/interface/product.interface";
import { create } from "zustand";

const useCartStore = create<CartStore>()((set, get) => ({
  items: [],
  subtotal: 0,
  itemCount: 0,

  addProduct: (product: ProductItem, quantity: number = 1) => {
    const items = [...get().items];
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({ ...product, quantity });
    }

    set((state) => ({
      items,
      subtotal: state.calculateSubtotal(),
      itemCount: state.calculateItemCount(),
    }));
  },

  incrementQuantity: (productId: string) => {
    const items = [...get().items];
    const existingItem = items.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    }

    set((state) => ({
      items,
      subtotal: state.calculateSubtotal(),
      itemCount: state.calculateItemCount(),
    }));
  },

  removeProduct: (productId: string) => {
    const items = [...get().items];
    const existingItemIndex = items.findIndex((item) => item.id === productId);

    if (existingItemIndex !== -1) {
      const item = items[existingItemIndex];
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        items.splice(existingItemIndex, 1);
      }
    }

    set((state) => ({
      items,
      subtotal: state.calculateSubtotal(),
      itemCount: state.calculateItemCount(),
    }));
  },

  updateQuantity: (productId: string, quantity: number) => {
    const items = [...get().items];
    const existingItem = items.find((item) => item.id === productId);

    if (existingItem) {
      if (quantity <= 0) {
        const index = items.indexOf(existingItem);
        items.splice(index, 1);
      } else {
        existingItem.quantity = quantity;
      }
    }

    set((state) => ({
      items,
      subtotal: state.calculateSubtotal(),
      itemCount: state.calculateItemCount(),
    }));
  },

  clearCart: () => {
    set({
      items: [],
      subtotal: 0,
      itemCount: 0,
    });
  },

  calculateSubtotal: () => {
    return get().items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  },

  calculateItemCount: () => {
    return get().items.reduce((count, item) => {
      return count + item.quantity;
    }, 0);
  },
}));

export default useCartStore;
