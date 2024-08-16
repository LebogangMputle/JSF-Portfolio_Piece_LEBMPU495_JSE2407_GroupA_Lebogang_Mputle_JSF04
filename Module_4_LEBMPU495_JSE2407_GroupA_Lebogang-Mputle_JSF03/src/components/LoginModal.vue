<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl mb-4">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block mb-2">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="w-full p-2 border rounded"
            :disabled="isLoading"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-2">Password</label>
          <div class="relative">
            <input
              :type="passwordVisible ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="w-full p-2 border rounded"
              :disabled="isLoading"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600"
              :disabled="isLoading"
            >
              {{ passwordVisible ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <!-- Error message display -->
        <div v-if="errorMessage" class="mb-4 text-red-500">
          {{ errorMessage }}
        </div>
        <div class="flex justify-end">
          <button
            type="button"
            @click="$emit('cancel')"
            class="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-2"
            :disabled="isLoading"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-blue-500 text-white py-2 px-4 rounded"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </div>
      </form>
      <!-- Display loading spinner or message when loading -->
      <div v-if="isLoading" class="mt-4 text-center text-gray-600">
        Authenticating, please wait...
        <div class="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full border-t-transparent mt-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      passwordVisible: false, // State to track password visibility
      isLoading: false, // State to track if authentication is in progress
      errorMessage: '' // State to store error messages
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible; // Toggle the password visibility state
    },
    async login() {
      this.isLoading = true; // Set loading state to true
      this.errorMessage = ''; // Clear previous error messages
      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        const data = await response.json();

        if (response.ok) {
          // Store the token for future requests
          localStorage.setItem('token', data.token);

          // Redirect to the originally requested page or home
          const redirectTo = this.$route.query.redirect || '/';
          this.$router.push(redirectTo);

          // Notify the parent component about successful login and close the login modal
          this.$emit('login-success');
          this.$emit('cancel');
        } else {
          this.errorMessage = 'Login failed, check your username or password.';
        }
      } catch (error) {
        this.errorMessage = 'Login failed, check your username or password.';
      } finally {
        this.isLoading = false; // Reset loading state
      }
    }
  }
};
</script>
