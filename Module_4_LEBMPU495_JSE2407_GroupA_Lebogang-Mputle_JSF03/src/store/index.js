// store/index.js

import { createStore } from 'vuex';

const state = {
  products: [],
  cart: [],
  wishlist: [],
  comparisonList: [], // Added for comparison functionality
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
    state.cart.push(product);
  },
  removeFromCart(state, productId) {
    state.cart = state.cart.filter(product => product.id !== productId);
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
  // New Mutations for Comparison List
  addToComparisonList(state, product) {
    if (!state.comparisonList.find(item => item.id === product.id)) {
      state.comparisonList.push(product);
    }
  },
  removeFromComparisonList(state, productId) {
    state.comparisonList = state.comparisonList.filter(product => product.id !== productId);
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
  products: state => state.products,
  cart: state => state.cart,
  wishlist: state => state.wishlist,
  isLoggedIn: state => state.isLoggedIn,
  cartCount: state => state.cart.length,
  cartTotal(state) {
    return state.cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  },
  // New Getter for Comparison List
  comparisonList: state => state.comparisonList,
};

export default createStore({
  state,
  mutations,
  actions,
  getters,
});
