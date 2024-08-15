<template>
  <div class="p-4 bg-[#caf0f8]">
    <h1 class="text-2xl font-semibold mb-4">Comparison</h1>
    <button @click="$router.push('/')" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mb-4">Back to Products</button>
    
    <div v-if="filteredComparisonList.length === 0" class="text-center text-gray-600">Your comparison list is empty.</div>
    
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
    this.$store.commit('removeFromComparison', productId); // Correct mutation name
  }
},
  created() {
    this.updateFilteredComparisonList();
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>
