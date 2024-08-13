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
    },
    clearCart(state) {
      state.cart = []; // Clears the entire cart
      localStorage.removeItem('cart'); // Optional: Also remove from local storage if you're storing cart there
    }
  },
  getters: {
    cartItems(state) {
      return state.cart;
    }
  }
});
