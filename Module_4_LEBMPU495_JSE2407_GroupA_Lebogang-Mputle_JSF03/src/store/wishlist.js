// src/store/wishlist.js
import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      wishlist: []
    };
  },
  mutations: {
    addToWishlist(state, product) {
      if (!state.wishlist.find(item => item.id === product.id)) {
        state.wishlist.push(product);
      }
    },
    removeFromWishlist(state, productId) {
      state.wishlist = state.wishlist.filter(item => item.id !== productId);
    }
  },
  getters: {
    wishlistItems(state) {
      return state.wishlist;
    }
  }
});
