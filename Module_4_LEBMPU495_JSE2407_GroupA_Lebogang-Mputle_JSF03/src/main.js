import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index'; // import Vuex store
import Cart from './views/Cart.vue';
import Wishlist from './views/Wishlist.vue';
import './assets/index.css'; // Ensure this path is correct

// Polyfill for process
import process from 'process';
window.process = process;

/**
 * Initializes and mounts the Vue application.
 * - Uses the Vue Router for handling routes.
 * - Uses Vuex store for state management.
 */
createApp(App)
  .use(router)  // Install and configure the router
  .use(store)   // Install and configure Vuex store
  .mount('#app');  // Mount the Vue instance to the DOM element with id 'app'
