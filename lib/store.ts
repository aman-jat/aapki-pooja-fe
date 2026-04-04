"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  selectedColor: string;
  selectedColorName: string;
  selectedSize: string;
  quantity: number;
};

type State = {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQty: (productId: string, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  setCartOpen: (open: boolean) => void;
  cartTotal: () => number;
  cartCount: () => number;
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      cartOpen: false,

      addToCart: (item) => {
        set((s) => {
          const idx = s.cart.findIndex(
            (c) => c.productId === item.productId && c.selectedSize === item.selectedSize && c.selectedColor === item.selectedColor
          );
          if (idx >= 0) {
            const cart = [...s.cart];
            cart[idx] = { ...cart[idx], quantity: cart[idx].quantity + item.quantity };
            return { cart };
          }
          return { cart: [...s.cart, item] };
        });
      },

      removeFromCart: (productId, size, color) => {
        set((s) => ({
          cart: s.cart.filter(
            (c) => !(c.productId === productId && c.selectedSize === size && c.selectedColor === color)
          ),
        }));
      },

      updateQty: (productId, size, color, qty) => {
        set((s) => {
          if (qty <= 0) {
            return {
              cart: s.cart.filter(
                (c) => !(c.productId === productId && c.selectedSize === size && c.selectedColor === color)
              ),
            };
          }
          return {
            cart: s.cart.map((c) =>
              c.productId === productId && c.selectedSize === size && c.selectedColor === color
                ? { ...c, quantity: qty }
                : c
            ),
          };
        });
      },

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (id) => {
        set((s) => ({
          wishlist: s.wishlist.includes(id)
            ? s.wishlist.filter((w) => w !== id)
            : [...s.wishlist, id],
        }));
      },

      isWishlisted: (id) => get().wishlist.includes(id),

      setCartOpen: (open) => set({ cartOpen: open }),

      cartTotal: () => get().cart.reduce((sum, c) => sum + c.price * c.quantity, 0),

      cartCount: () => get().cart.reduce((sum, c) => sum + c.quantity, 0),
    }),
    { name: "apk-store" }
  )
);
