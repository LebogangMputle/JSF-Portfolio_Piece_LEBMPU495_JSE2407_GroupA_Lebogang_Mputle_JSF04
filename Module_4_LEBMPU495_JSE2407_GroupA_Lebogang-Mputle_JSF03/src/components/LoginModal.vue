<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl mb-4">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block mb-2">Username</label>
          <input type="text" id="username" v-model="username" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-2">Password</label>
          <div class="relative">
            <input
              :type="passwordVisible ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="w-full p-2 border rounded"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600"
            >
              {{ passwordVisible ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="$emit('cancel')" class="bg-gray-200 text-gray-800 py-2 px-4 rounded mr-2">Cancel</button>
          <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      passwordVisible: false // State to track password visibility
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible; // Toggle the password visibility state
    },
    async login() {
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
          const redirectTo = this.$route.query.redirect || '/'; // Redirect to the originally requested page or home
          this.$router.push(redirectTo); // Navigate to the page after login
          this.$emit('login-success'); // Notify the parent component about successful login
          this.$emit('cancel'); // Close the login modal
        } else {
          alert('Login failed: ' + (data.error || 'Invalid credentials'));
        }
      } catch (error) {
        alert('An error occurred: ' + error.message);
      }
    }
  }
};
</script>
