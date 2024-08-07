import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductDetails from '../components/ProductDetails.vue';
import Cart from '../views/Cart.vue';
import Wishlist from '../views/Wishlist.vue';

/**
 * Array of route definitions.
 * Each route maps a URL path to a component.
 * @type {Array<Object>}
 */
const routes = [
  /**
   * Route for the home page.
   * @type {Object}
   * @property {string} path - The URL path.
   * @property {string} name - The name of the route.
   * @property {Object} component - The component to render.
   */
  { path: '/', name: 'Home', component: Home },

  /**
   * Route for the product details page.
   * @type {Object}
   * @property {string} path - The URL path.
   * @property {string} name - The name of the route.
   * @property {Object} component - The component to render.
   * @property {boolean} props - If true, route params are passed as props to the component.
   */
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails, props: true },

  /**
   * Route for the cart page.
   * @type {Object}
   * @property {string} path - The URL path.
   * @property {string} name - The name of the route.
   * @property {Object} component - The component to render.
   */
  { path: '/cart', name: 'Cart', component: Cart },

  /**
   * Route for the wishlist page.
   * @type {Object}
   * @property {string} path - The URL path.
   * @property {string} name - The name of the route.
   * @property {Object} component - The component to render.
   */
  { path: '/wishlist', name: 'Wishlist', component: Wishlist }
];

/**
 * Creates a new Vue Router instance.
 * @type {Object}
 * @property {Object} history - The router history mode.
 * @property {Array<Object>} routes - The route definitions.
 */
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
