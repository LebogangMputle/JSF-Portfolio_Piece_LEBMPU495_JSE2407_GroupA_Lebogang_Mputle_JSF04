<template>
  <div id="app">
    <Header @toggle-login="showLoginModal = !showLoginModal" />
    <router-view></router-view> <!-- Display routed components -->
    <LoginModal v-if="showLoginModal" @login="handleLogin" @cancel="showLoginModal = false" />
    <button v-if="isAuthenticated" @click="logout" class="bg-red-500 text-white py-2 px-4 rounded fixed bottom-4 right-4">Logout</button>
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
      showLoginModal: false, // Controls the visibility of the login modal
      isAuthenticated: false // Tracks if the user is authenticated
    };
  },
  mounted() {
    // Check if the user is already logged in by verifying the token in localStorage
    this.isAuthenticated = !!localStorage.getItem('token');
  },
  methods: {
    /**
     * Handles user login by navigating to the home page.
     * Closes the login modal after login.
     */
    handleLogin() {
      this.isAuthenticated = true; // Set the user as authenticated
      this.$router.push('/'); // Navigate to home page after login
      this.showLoginModal = false; // Close the login modal
    },
    /**
     * Logs out the user by clearing the token and redirecting to the home page.
     */
    logout() {
      localStorage.removeItem('token'); // Remove the token from localStorage
      this.isAuthenticated = false; // Set the user as not authenticated
      this.$router.push('/'); // Navigate to home page after logout
    }
  }
};
</script>
