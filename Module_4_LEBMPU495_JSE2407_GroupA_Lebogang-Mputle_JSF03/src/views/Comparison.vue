<template>
  <div class="p-4 bg-[#caf0f8]">
    <h1 class="text-2xl font-semibold mb-4">Comparison</h1>
    <button @click="$router.push('/')" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-4">Back to Products</button>
    
    <!-- Sorting and Filtering Controls -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <select class="p-2 border rounded bg-white text-gray-800" v-model="sortOrder" @change="sortItems">
          <option value="default">Sort by: Default</option>
          <option value="price-asc">Sort by: Price - Low to High</option>
          <option value="price-desc">Sort by: Price - High to Low</option>
        </select>
      </div>
      <div class="flex-1 mx-4">
        <input type="text" placeholder="Search items..." class="w-full p-2 border rounded bg-white text-gray-800" v-model="searchQuery" @input="filterItems" />
      </div>
    </div>
    
    <div v-if="filteredComparisonList.length === 0" class="text-center text-gray-600">Your comparison list is empty.</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in filteredComparisonList" :key="product.id" class="product-card border shadow p-4 bg-white">
        <img :src="product.image" :alt="product.title" class="h-40 w-full object-contain mb-4" />
        <h2 class="text-lg font-semibold mb-2">{{ product.title }}</h2>
        <p class="text-gray-500 mb-2">{{ product.category }}</p>
        <p class="text-blue-500 font-bold mb-2">${{ product.price.toFixed(2) }}</p>
        <button @click="removeFromComparisonList(product.id)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Remove from Comparison</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortOrder: 'default',
      searchQuery: '',
      filteredComparisonList: []
    };
  },
  computed: {
    comparisonList() {
      return this.$store.getters.comparisonList;
    }
  },
  watch: {
    comparisonList: 'updateFilteredComparisonList',
    sortOrder: 'sortItems',
    searchQuery: 'filterItems'
  },
  methods: {
    updateFilteredComparisonList() {
      this.filteredComparisonList = [...this.comparisonList];
      this.sortItems();
      this.filterItems();
    },
    sortItems() {
      if (this.sortOrder === 'price-asc') {
        this.filteredComparisonList.sort((a, b) => a.price - b.price);
      } else if (this.sortOrder === 'price-desc') {
        this.filteredComparisonList.sort((a, b) => b.price - a.price);
      }
    },
    filterItems() {
      this.filteredComparisonList = this.comparisonList.filter(product => product.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      this.sortItems();
    },
    removeFromComparisonList(productId) {
      this.$store.commit('removeFromComparisonList', productId);
    }
  },
  created() {
    this.updateFilteredComparisonList();
  }
};
</script>

<style scoped>
.product-card {
  border-radius: 15px;
  overflow: hidden;
}
</style>
