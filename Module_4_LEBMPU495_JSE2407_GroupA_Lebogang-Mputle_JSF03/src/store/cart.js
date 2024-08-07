// src/store/cart.js
import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      cart: []
    };
  },
  mutations: {
    addToCart(state, product) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    }
  },
  getters: {
    cartItems(state) {
      return state.cart;
    }
  }
});
