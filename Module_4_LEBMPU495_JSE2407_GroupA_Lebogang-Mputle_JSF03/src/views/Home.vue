<template>
  <div>
    <ProductList @select-product="selectProduct" />
    <LoginModal v-if="showLoginModal" @login="handleLogin" @cancel="showLoginModal = false" />
  </div>
</template>

<script>
import ProductList from '../components/ProductList.vue';
import LoginModal from '../components/LoginModal.vue';

export default {
  components: {
    ProductList,
    LoginModal
  },
  data() {
    return {
      /**
       * Indicates whether the login modal is visible.
       * @type {boolean}
       */
      showLoginModal: false
    };
  },
  methods: {
    /**
     * Handles the login process by setting the logged-in state to true
     * and hiding the login modal.
     */
    handleLogin() {
      this.$store.commit('setIsLoggedIn', true);
      this.showLoginModal = false;
    },
    /**
     * Handles the selection of a product by navigating to the product details page.
     * @param {Object} product - The selected product.
     */
    selectProduct(product) {
      this.$router.push({ name: 'ProductDetails', params: { id: product.id } });
    }
  }
};
</script>
