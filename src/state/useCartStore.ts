import { CartItem, CartStore } from "@/interface/cart.interface";
import { ProductItem } from "@/interface/product.interface";
import Toast from "react-native-toast-message";
import { create } from "zustand";

const useCartStore = create<CartStore>((set, get) => ({
  cart: { items: [] },

  /**
   * Tthis state is used to add product inside the cart
   * @param product a product item
   * @param quantity a number for quantity of product
   * @returns
   */
  addProduct: (product: ProductItem, quantity: number = 1) =>
    set((state) => {
      // check if the product exist
      const existingProduct = state.cart.items.find(
        (items) => items.id === product.id
      );

      if (existingProduct) {
        // increment the quantity
        const updatedProductQuantity = state.cart.items.map((items) =>
          items.id === product.id
            ? { ...items, quantity: items.quantity + quantity }
            : items
        );

        return {
          cart: {
            items: updatedProductQuantity,
          },
        };
      }

      return {
        cart: {
          items: [...state.cart.items, { ...product, quantity }],
        },
      };
    }),

  /**
   * This function helps to remove the item insidet the cart
   * @param productId a unique string used to identifity the product id
   * @returns
   */
  removeProduct: (productId: string) =>
    set((state) => {
      const existingProductg = state.cart.items.find(
        (item) => item.id === productId
      );

      if (!existingProductg) {
        Toast.show({
          type: "error",
          text1: "Product does'nt exist, Please try again later",
        });
        return state;
      }

      const removedProductCart = state.cart.items.filter(
        (item) => item.id !== productId
      );

      return {
        cart: {
          items: removedProductCart,
        },
      };
    }),

  updateProductQuantity: (productId: string, quantity: number) =>
    set((state) => {
      const existingProductg = state.cart.items.find(
        (item) => item.id === productId
      );

      if (!existingProductg) {
        Toast.show({
          type: "error",
          text1: "Product does'nt exist, Please try again later",
        });
        return state;
      }

      const updatedQuantity = state.cart.items.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );

      return {
        cart: {
          items: updatedQuantity,
        },
      };
    }),

  clearCart: () => set(() => ({ cart: { items: [] } })),

  getCartTotal: () => {
    const state = get();

    return state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  getCartItemCount: () => {
    const state = get();
    return state.cart.items.reduce((count, item) => count + item.quantity, 0);
  },

  getProductDetails: (productId: string): CartItem | undefined => {
    const state = get();

    const existingProduct = state.cart.items.find(
      (item) => item.id === productId
    );

    return existingProduct;
  },
}));

export default useCartStore;
