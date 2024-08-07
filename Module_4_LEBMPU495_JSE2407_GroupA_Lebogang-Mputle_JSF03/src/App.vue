<template>
  <div id="app">
    <Header @toggle-login="showLoginModal = !showLoginModal" />
    <router-view></router-view> <!-- Display routed components -->
    <LoginModal v-if="showLoginModal" @login="handleLogin" @cancel="showLoginModal = false" />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import LoginModal from './components/LoginModal.vue';

export default {
  components: {
    Header,
    LoginModal
  },
  data() {
    return {
      /**
       * Controls the visibility of the login modal.
       * @type {boolean}
       */
      showLoginModal: false
    };
  },
  methods: {
    /**
     * Handles user login by navigating to the product list page.
     * Closes the login modal after login.
     */
    handleLogin() {
      this.$router.push('/product-list'); // Navigate to product list on login
      this.showLoginModal = false;
    }
  }
};
</script>
