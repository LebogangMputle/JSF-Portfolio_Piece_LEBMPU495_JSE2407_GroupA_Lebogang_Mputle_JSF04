<template>
  <div class="p-4 bg-[#caf0f8]">
    <h1 class="text-2xl font-semibold mb-4">Cart</h1>
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
    
    <div v-if="filteredCart.length === 0" class="text-center text-gray-600">Your cart is empty.</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="product in filteredCart" :key="product.id" class="product-card border shadow p-4 bg-white">
        <img :src="product.image" :alt="product.title" class="h-40 w-full object-contain mb-4" />
        <h2 class="text-lg font-semibold mb-2">{{ product.title }}</h2>
        <p class="text-gray-500 mb-2">{{ product.category }}</p>
        <p class="text-blue-500 font-bold mb-2">${{ product.price.toFixed(2) }}</p>
        <button @click="removeFromCart(product.id)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Remove from Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * Data properties of the component.
   * @returns {Object}
   */
  data() {
    return {
      /**
       * The current sort order for the cart items.
       * @type {string}
       */
      sortOrder: 'default',
      /**
       * The current search query for filtering cart items.
       * @type {string}
       */
      searchQuery: '',
      /**
       * The filtered list of cart items.
       * @type {Array<Object>}
       */
      filteredCart: []
    };
  },
  computed: {
    /**
     * Computed property to get the cart items from the store.
     * @returns {Array<Object>}
     */
    cart() {
      return this.$store.getters.cart;
    }
  },
  watch: {
    /**
     * Watcher for the cart items.
     * Calls updateFilteredCart method when the cart items change.
     */
    cart: 'updateFilteredCart',
    /**
     * Watcher for the sortOrder property.
     * Calls sortItems method when the sortOrder changes.
     */
    sortOrder: 'sortItems',
    /**
     * Watcher for the searchQuery property.
     * Calls filterItems method when the searchQuery changes.
     */
    searchQuery: 'filterItems'
  },
  methods: {
    /**
     * Updates the filteredCart property based on the current cart items.
     */
    updateFilteredCart() {
      this.filteredCart = [...this.cart];
      this.sortItems();
      this.filterItems();
    },
    /**
     * Sorts the filteredCart items based on the current sortOrder.
     */
    sortItems() {
      if (this.sortOrder === 'price-asc') {
        this.filteredCart.sort((a, b) => a.price - b.price);
      } else if (this.sortOrder === 'price-desc') {
        this.filteredCart.sort((a, b) => b.price - a.price);
      }
    },
    /**
     * Filters the cart items based on the searchQuery.
     */
    filterItems() {
      this.filteredCart = this.cart.filter(product => product.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
      this.sortItems();
    },
    /**
     * Removes an item from the cart by its ID.
     * @param {number} productId - The ID of the product to remove.
     */
    removeFromCart(productId) {
      this.$store.commit('removeFromCart', productId);
    }
  },
  created() {
    /**
     * Called when the component is created.
     * Initializes the filteredCart property.
     */
    this.updateFilteredCart();
  }
};
</script>

<style scoped>
.product-card {
  border-radius: 15px;
  overflow: hidden;
}
</style>
