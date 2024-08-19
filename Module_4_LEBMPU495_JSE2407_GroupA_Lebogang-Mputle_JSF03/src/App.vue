<template>
  <div :class="{ 'dark': isDarkMode }" id="app">
    <!-- Pass isAuthenticated and handleLogout as props to the Header component -->
    <Header 
      :isAuthenticated="isAuthenticated" 
      @toggle-login="showLoginModal = !showLoginModal" 
      @logout="logout"
      @toggle-dark-mode="toggleDarkMode"
    >
    </Header>
    <router-view></router-view> <!-- Display routed components -->

    <!-- Login Modal -->
    <LoginModal
      v-if="showLoginModal"
      @login="handleLogin"
      @cancel="showLoginModal = false"
    />
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
      isAuthenticated: false, // Tracks if the user is authenticated
      isDarkMode: false // Tracks if dark mode is enabled
    };
  },
  mounted() {
    // Check if the user is already logged in by verifying the token in localStorage
    this.isAuthenticated = !!localStorage.getItem('token');

    // Check the user's dark mode preference from localStorage
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
  },
  methods: {
    /**
     * Handles user login by navigating to the home page.
     * Closes the login modal after login.
     */
    handleLogin() {
      this.isAuthenticated = true; // Set the user as authenticated
      this.$router.push(this.$route.query.redirect || '/'); // Navigate to the redirected or home page after login
      this.showLoginModal = false; // Close the login modal
    },
    /**
     * Logs out the user by clearing the token and redirecting to the home page.
     */
    logout() {
      localStorage.removeItem('token'); // Remove the token from localStorage
      this.isAuthenticated = false; // Set the user as not authenticated
      this.$router.push('/'); // Navigate to the home page after logout
    },
    /**
     * Toggles between dark and light mode.
     * Stores the user's preference in localStorage.
     */
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode; // Toggle dark mode state
      localStorage.setItem('darkMode', this.isDarkMode); // Save the preference in localStorage
    }
  }
};
</script>

