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
            <input type="password" id="password" v-model="password" class="w-full p-2 border rounded">
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
        password: ''
      };
    },
    methods: {
      login() {
        // Dummy login logic
        if (this.username === 'user' && this.password === 'pass') {
          this.$emit('login');
        } else {
          alert('Invalid credentials');
        }
      }
    }
  };
  </script>
  