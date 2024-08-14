import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductDetails from '../components/ProductDetails.vue';
import Cart from '../views/Cart.vue';
import Wishlist from '../views/Wishlist.vue';
import LoginModal from '../components/LoginModal.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product/:id', name: 'ProductDetails', component: ProductDetails, props: true },
  { path: '/cart', name: 'Cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/wishlist', name: 'Wishlist', component: Wishlist, meta: { requiresAuth: true } },
  { path: '/login', name: 'LoginModal', component: LoginModal },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || '/'),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'LoginModal', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
