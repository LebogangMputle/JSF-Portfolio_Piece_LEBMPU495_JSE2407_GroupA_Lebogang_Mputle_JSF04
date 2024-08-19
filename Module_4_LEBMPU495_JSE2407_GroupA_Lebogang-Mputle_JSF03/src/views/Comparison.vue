<template>
  <div class="p-4 bg-[#caf0f8]">
    <h1 class="text-2xl font-semibold mb-4">Comparison</h1>
    <button @click="$router.push('/')" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-4">Back to Products</button>
    <button v-if="isLoggedIn" @click="clearComparison" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mb-4">Clear Comparison List</button>

    <div v-if="!isLoggedIn">
      <p class="text-center text-gray-600">Please <router-link to="/login" class="text-blue-500">log in</router-link> to view your comparison list.</p>
    </div>

    <div v-else-if="filteredComparisonList.length === 0" class="text-center text-gray-600">Your comparison list is empty.</div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th class="px-4 py-2 border-b border-gray-300 text-left">Attribute</th>
            <th v-for="product in filteredComparisonList" :key="product.id" class="px-4 py-2 border-b border-gray-300 text-left">
              <div class="flex justify-between items-center">
                <img :src="product.image" :alt="product.title" class="h-16 w-16 object-contain mr-2" />
                <button @click="removeFromComparisonList(product.id)" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">Remove</button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="px-4 py-2 border-b border-gray-300">Title</td>
            <td v-for="product in filteredComparisonList" :key="product.id" class="px-4 py-2 border-b border-gray-300">{{ product.title }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border-b border-gray-300">Category</td>
            <td v-for="product in filteredComparisonList" :key="product.id" class="px-4 py-2 border-b border-gray-300">{{ product.category }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border-b border-gray-300">Price</td>
            <td v-for="product in filteredComparisonList" :key="product.id" class="px-4 py-2 border-b border-gray-300">${{ product.price.toFixed(2) }}</td>
          </tr>
          <tr>
            <td class="px-4 py-2 border-b border-gray-300">Rating</td>
            <td v-for="product in filteredComparisonList" :key="product.id" class="px-4 py-2 border-b border-gray-300">{{ product.rating.rate }} ({{ product.rating.count }} reviews)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortOrder: 'default', // Set initial sort order
      searchQuery: '', // Set initial search query
      filteredComparisonList: [] // Initialize filtered comparison list
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn; // Check if the user is logged in
    },
    comparisonList() {
      return this.$store.getters.comparisonList; // Get the comparison list from the store
    },
  },
  watch: {
    comparisonList: 'updateFilteredComparisonList', // Watch for changes in the comparison list
    sortOrder: 'sortItems', // Watch for changes in the sort order
    searchQuery: 'filterItems' // Watch for changes in the search query
  },
  methods: {
    updateFilteredComparisonList() {
      this.filteredComparisonList = [...this.comparisonList]; // Update the filtered list
      this.sortItems(); // Apply sorting
      this.filterItems(); // Apply filtering
    },
    sortItems() {
      if (this.sortOrder === 'price-asc') {
        this.filteredComparisonList.sort((a, b) => a.price - b.price); // Sort by price ascending
      } else if (this.sortOrder === 'price-desc') {
        this.filteredComparisonList.sort((a, b) => b.price - a.price); // Sort by price descending
      }
    },
    filterItems() {
      this.filteredComparisonList = this.comparisonList.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      ); // Filter items by search query
      this.sortItems(); // Apply sorting after filtering
    },
    removeFromComparisonList(productId) {
      this.$store.commit('removeFromComparison', productId); // Remove item from comparison list
    },
    clearComparison() {
      this.$store.commit('clearComparisonList'); // Clear the comparison list
      this.updateFilteredComparisonList(); // Update the filtered list
    },
  },
  created() {
    this.updateFilteredComparisonList(); // Initialize the filtered comparison list on creation
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse; /* Ensure borders are collapsed */
}
th, td {
  padding: 8px; /* Padding for cells */
  text-align: left; /* Align text to the left */
  border-bottom: 1px solid #ddd; /* Border for cells */
}
</style>
