import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductDetails from '../components/ProductDetails.vue';
import Cart from '../views/Cart.vue';
import Wishlist from '../views/Wishlist.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails, props: true },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/wishlist', name: 'Wishlist', component: Wishlist }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Route guard to check for authentication before accessing specific routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if the token is stored

  if ((to.name === 'Cart' || to.name === 'Wishlist') && !isAuthenticated) {
    next('/'); // Redirect to the home page if not authenticated
  } else {
    next(); // Proceed to the route if authenticated or not a protected route
  }
});

export default router;
