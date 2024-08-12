import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductDetails from '../components/ProductDetails.vue';
import Cart from '../views/Cart.vue';
import Wishlist from '../views/Wishlist.vue';
import LoginModal from '../components/LoginModal.vue'; // Import your LoginModal component

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails, props: true },
  { path: '/cart', name: 'Cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/wishlist', name: 'Wishlist', component: Wishlist, meta: { requiresAuth: true } },
  { path: '/login', name: 'LoginModal', component: LoginModal }, // Correct route name
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'LoginModal', query: { redirect: to.fullPath } }); // Correct route name
  } else {
    next(); // Proceed to the route
  }
});

export default router;
