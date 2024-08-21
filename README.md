# Vue.js E-Commerce Application

Welcome to the Vue.js E-Commerce Application! This is a modern e-commerce platform built with Vue.js, featuring product listing, cart management, wishlist functionality, product comparison, and user authentication. Originally developed as a React.js app, it has been successfully ported to Vue.js for improved performance and maintainability.

## Table of Contents
1. Project Overview
2. Technology Stack
3. Initial Project Setup
4. Routing
6. State Management
7. Core Features
8. Authentication Handling
9. User Interface and Styling
10. Deployment
11. Challenges and Solutions
12. Future Improvements
13. Installation
14. Usage
15. Contributing
16. License

## 1. Project Overview

This Vue.js e-commerce application provides a seamless shopping experience with functionalities including

- Product listing with sorting and filtering.
- Cart management for adding, removing, and updating items.
- Wishlist management for saving favorite products.
- Product comparison feature for side-by-side evaluation.
- User authentication for secure access to protected routes.

## 2. Technology Stack
- Frontend: Vue.js 3.x
- State management: Vuex
- Client-side routing: Vue Router
- Styling: Tailwind CSS
Project scaffolding: Vite

## 3. Initial Setup

To set up the project
- 1. create the Projet:
    - using Vite: npm init vite@latest project-name --template vue
- 2. Configuration:
    - Chose Vue 3, Babel, ESLint, Vuex, and Vue Router during setup.
- 3. Project Structure:
    - src: Contains components, views, router, and store.
    - components: Reusable UI elements.
    - views: Core application pages.
    - router: Configures routing.
    - store: Manages state with Vuex.

## 4. Routing
    - Vue Router Integration: Installed and configured in router/index.js.
    - Routes: Includes Home, ProductDetails, Cart, Wishlist, Comparison and Login.
    - Dynamic Routes: Used for product details.
    - Navigation Guards: Implemented for authentication checks.

## 5. State Management
    - Vuex Integration: Installed and configured in store/index.js.
    - State: Includes cart, wishlist, and comparison data.
    - Mutations: Handles actions such as adding/removing products, updating quantities.
    - Actions: Includes asynchronous operations like fetching products.
    - Getters: Provides computed values like cart totals and item counts.

## 6. Core Features
    - Product Listing: Fetches products from an API, with sorting and filtering options
    -  Cart Management: Add/remove items, update quantities, and view totals.
    - Wishlist Management: Save and manage favorite products.
    -  Comparison Feature: Compare up to four products.

## Authentication Handling
    - Login/Logout: Manages authentication with tokens stored in localStorage.
    - Protected Routes: Ensures secure access to certain pages.

## User Interface and Styling
    - UI Components: Modular components like ProductCard.
    - Styling: Utilizes Tailwind CSS (or other frameworks) for responsive design.

## Deployment
    - Build and deploy the application using Vite's build command.
    - Environment Variables: Configured using .env files.

## Challenges and Solutions
    - State Management: Refactored Vuex state management for clarity.
    - Comparison Feature: Implemented logic to handle up to four products in comparison.

## Installation:

    1. Clone the repository:
        - git clone https://github.com/your-username/your-repo.git
    2. Navigate to the project directory:
        - cd your-repo
    3. Install dependecies:
        - npm install
    4. Start the development server:
        - npm run dev