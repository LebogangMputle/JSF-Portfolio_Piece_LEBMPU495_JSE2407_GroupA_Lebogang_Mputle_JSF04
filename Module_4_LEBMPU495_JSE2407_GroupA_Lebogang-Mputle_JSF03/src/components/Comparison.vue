<template>
    <div>
      <!-- Other component content -->
      
      <div v-for="product in cart" :key="product.id" class="product-card">
        <!-- Product details -->
  
        <!-- Add to Comparison List Button -->
        <button @click="addToComparison(product)" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          Add to Comparison
        </button>
      </div>
  
      <!-- Display Comparison List -->
      <div v-if="comparisonList.length > 0">
        <h2>Comparison List</h2>
        <ul>
          <li v-for="product in comparisonList" :key="product.id">
            {{ product.title }} - ${{ product.price }}
            <button @click="removeFromComparison(product.id)">Remove</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      cart() {
        return this.$store.getters.cart;
      },
      comparisonList() {
        return this.$store.getters.comparisonList;
      }
    },
    methods: {
      addToComparison(product) {
        this.$store.commit('addToComparisonList', product);
      },
      removeFromComparison(productId) {
        this.$store.commit('removeFromComparisonList', productId);
      }
    }
  };
  </script>
  