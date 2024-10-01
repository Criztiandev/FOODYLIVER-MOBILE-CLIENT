import { ProductItem } from "./product.interface";

export interface CartItem extends ProductItem {
  quantity: number;
}

export interface Cart {
  items: Array<CartItem>;
}

export interface CartStore {
  cart: Cart;
  addProduct: (product: ProductItem, quantity: number) => void;
  removeProduct: (productId: string, quantity: number) => void;
  updateProductQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => void;
  getProductDetails: (id: string) => CartItem | null | undefined;
}
