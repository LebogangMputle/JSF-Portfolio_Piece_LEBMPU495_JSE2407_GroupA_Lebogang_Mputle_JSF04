<template>
  <div class="p-4 bg-[#caf0f8]">
    <h1 class="text-2xl font-semibold mb-4">Wishlist</h1>
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
    
    <div v-if="filteredWishlist.length === 0" class="text-center text-gray-600">Your wishlist is empty.</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div v-for="product in filteredWishlist" :key="product.id" class="product-card border shadow p-4 bg-white">
    <img :src="product.image" :alt="product.title" class="h-40 w-full object-contain mb-4" />
    <h2 class="text-lg font-semibold mb-2">{{ product.title }}</h2>
    <p class="text-gray-500 mb-2">{{ product.category }}</p>
    <p class="text-blue-500 font-bold mb-2">${{ product.price.toFixed(2) }}</p>
    <button @click="removeFromWishlist(product.id)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Remove from Wishlist</button>
    <button @click="moveToCart(product.id)" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition mt-2">Add to Cart</button>
    <button @click="$router.push(`/product/${product.id}`)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mt-2">View Details</button>
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
      filteredWishlist: []
    };
  },
  computed: {
    wishlist() {
      return this.$store.getters.wishlist;
    }
  },
  watch: {
    wishlist: 'updateFilteredWishlist',
    sortOrder: 'sortItems',
    searchQuery: 'filterItems'
  },
  methods: {
    updateFilteredWishlist() {
      this.filteredWishlist = [...this.wishlist];
      this.sortItems();
      this.filterItems();
    },
    sortItems() {
      if (this.sortOrder === 'price-asc') {
        this.filteredWishlist.sort((a, b) => a.price - b.price);
      } else if (this.sortOrder === 'price-desc') {
        this.filteredWishlist.sort((a, b) => b.price - a.price);
      }
    },
    filterItems() {
      this.filteredWishlist = this.wishlist.filter(product =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.sortItems();
    },
    moveToCart(productId) {
      this.$store.dispatch('addToCartFromWishlist', productId);
    },
    removeFromWishlist(productId) {
      this.$store.commit('removeFromWishlist', productId);
    }
  },
  created() {
    this.updateFilteredWishlist();
  }
};
</script>

<style scoped>
.product-card {
  border-radius: 15px;
  overflow: hidden;
}
</style>
