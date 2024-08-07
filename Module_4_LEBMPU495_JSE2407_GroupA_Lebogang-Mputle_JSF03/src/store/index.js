/**
 * @module store
 */

import { createStore } from 'vuex';

/**
 * @typedef {Object} State
 * @property {Array} products - List of products.
 * @property {Array} cart - List of products in the cart.
 * @property {Array} wishlist - List of products in the wishlist.
 * @property {boolean} isLoggedIn - User's login status.
 */

/**
 * State object for the Vuex store.
 * @type {State}
 */
const state = {
  products: [],
  cart: [],
  wishlist: [],
  isLoggedIn: false,
};

/**
 * Mutations for the Vuex store.
 * @type {Object}
 */
const mutations = {
  /**
   * Sets the products state.
   * @param {State} state - The state object.
   * @param {Array} products - The list of products.
   */
  setProducts(state, products) {
    state.products = products;
  },

  /**
   * Adds a product to the cart.
   * @param {State} state - The state object.
   * @param {Object} product - The product to add.
   */
  addToCart(state, product) {
    state.cart.push(product);
  },

  /**
   * Removes a product from the cart.
   * @param {State} state - The state object.
   * @param {number} productId - The ID of the product to remove.
   */
  removeFromCart(state, productId) {
    state.cart = state.cart.filter(product => product.id !== productId);
  },

  /**
   * Adds a product to the wishlist.
   * @param {State} state - The state object.
   * @param {Object} product - The product to add.
   */
  addToWishlist(state, product) {
    state.wishlist.push(product);
  },

  /**
   * Removes a product from the wishlist.
   * @param {State} state - The state object.
   * @param {number} productId - The ID of the product to remove.
   */
  removeFromWishlist(state, productId) {
    state.wishlist = state.wishlist.filter(product => product.id !== productId);
  },

  /**
   * Sets the user's login status.
   * @param {State} state - The state object.
   * @param {boolean} status - The login status.
   */
  setIsLoggedIn(state, status) {
    state.isLoggedIn = status;
  },
};

/**
 * Actions for the Vuex store.
 * @type {Object}
 */
const actions = {
  /**
   * Fetches the products from the API and commits the setProducts mutation.
   * @param {Object} context - The Vuex context object.
   */
  async fetchProducts({ commit }) {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    commit('setProducts', data);
  },
};

/**
 * Getters for the Vuex store.
 * @type {Object}
 */
const getters = {
  products: (state) => state.products,
  cart: (state) => state.cart,
  wishlist: (state) => state.wishlist,
  isLoggedIn: (state) => state.isLoggedIn,
  /**
   * Retrieves the number of items in the cart.
   * @param {State} state - The state object.
   * @returns {number} The number of items in the cart.
   */
  cartCount: (state) => state.cart.length,
};

export default createStore({
  state,
  mutations,
  actions,
  getters,
});
