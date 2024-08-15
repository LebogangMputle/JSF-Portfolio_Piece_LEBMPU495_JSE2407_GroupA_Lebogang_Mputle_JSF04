/**
 * @module store
 */

import { createStore } from 'vuex';

/**
 * @typedef {Object} State
 * @property {Array} products - List of products.
 * @property {Array} cart - List of products in the cart, each with a quantity.
 * @property {Array} wishlist - List of products in the wishlist.
 * @property {Array} comparisonList - List of products in the comparison list.
 * @property {boolean} isLoggedIn - User's login status.
 */

const state = {
  products: [],
  cart: [],
  wishlist: [],
  comparisonList: [], // Added comparisonList state
  isLoggedIn: false,
};

const mutations = {
  setProducts(state, products) {
    state.products = products;
  },

  clearCart(state) {
    state.cart = [];
  },

  addToCart(state, product) {
    const cartItem = state.cart.find(item => item.id === product.id);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      state.cart.push({ ...product, quantity: 1 });
    }
  },

  removeFromCart(state, productId) {
    state.cart = state.cart.filter(product => product.id !== productId);
  },

  addToComparison(state, product) {
    const existingProduct = state.comparisonList.find(item => item.id === product.id);
    if (!existingProduct) {
      state.comparisonList.push(product); // Adds product to comparison list if it doesn't already exist
    }
  },
  removeFromComparison(state, productId) {
    console.log('Removing product with ID:', productId); // Debugging line
    state.comparisonList = state.comparisonList.filter(product => product.id !== productId);
    console.log('Updated comparison list:', state.comparisonList); // Log updated list
  },

  incrementQuantity(state, productId) {
    const cartItem = state.cart.find(item => item.id === productId);
    if (cartItem) {
      cartItem.quantity += 1;
    }
  },

  decrementQuantity(state, productId) {
    const cartItem = state.cart.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      state.cart = state.cart.filter(item => item.id !== productId);
    }
  },

  addToWishlist(state, product) {
    state.wishlist.push(product);
  },

  removeFromWishlist(state, productId) {
    state.wishlist = state.wishlist.filter(product => product.id !== productId);
  },

  setIsLoggedIn(state, status) {
    state.isLoggedIn = status;
  },
};

const actions = {
  async fetchProducts({ commit }) {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    commit('setProducts', data);
  },
};


const getters = {
  products: (state) => state.products,
  cart: (state) => state.cart,
  wishlist: (state) => state.wishlist,
  comparisonList: (state) => state.comparisonList, // Getter for comparison list
  isLoggedIn: (state) => state.isLoggedIn,

  cartCount: (state) => state.cart.reduce((count, item) => count + item.quantity, 0),

  cartTotal(state) {
    return state.cart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0).toFixed(2);
  },
};

export default createStore({
  state,
  mutations,
  actions,
  getters,
});
