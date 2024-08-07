<template>
    <div>
      <button @click="$router.go(-1)">Back</button>
      <div v-if="product">
        <h1>{{ product.title }}</h1>
        <img :src="product.image" :alt="product.title" class="w-full h-auto" />
        <p>{{ product.description }}</p>
        <p>{{ product.price }}</p>
        <button @click="addToCart(product)" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Add to Cart</button>
        <button @click="addToWishlist(product)" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Add to Wishlist</button>
        <button @click="removeFromCart(product)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Remove from Cart</button>
        <button @click="removeFromWishlist(product)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Remove from Wishlist</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductDetails',
    props: {
      /**
       * The ID of the product to display.
       * @type {number}
       */
      id: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        /**
         * The product details.
         * @type {Object|null}
         */
        product: null
      };
    },
    created() {
      this.fetchProductDetails();
    },
    methods: {
      /**
       * Fetches the product details from the API.
       * @returns {Promise<void>}
       */
      async fetchProductDetails() {
        const response = await fetch(`https://fakestoreapi.com/products/${this.id}`);
        this.product = await response.json();
      }
    }
  };
  </script>
  