import { Products } from '@prisma/client';
import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', {
  state: (): State => ({
    isMenuOverlay: false,
    isLoading: false,
    cart: [],
    checkout: [],
  }),
});

interface State {
  isMenuOverlay: boolean;
  isLoading: boolean;
  cart: Products[];
  checkout: Products[];
}
