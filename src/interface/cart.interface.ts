import { ProductItem } from "./product.interface";

export interface CartItem extends ProductItem {
  quantity: number;
}

export interface Cart {
  items: Array<CartItem>;
}

export interface CartStore {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  addProduct: (product: ProductItem, quantity: number) => void;
  removeProduct: (productId: string, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  calculateSubtotal: () => number;
  calculateItemCount: () => number;
}
