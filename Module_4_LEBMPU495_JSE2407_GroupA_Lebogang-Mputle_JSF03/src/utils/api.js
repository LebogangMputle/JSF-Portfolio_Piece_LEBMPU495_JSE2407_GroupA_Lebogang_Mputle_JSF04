/**
 * Fetches data from a given API endpoint.
 * @param {string} url - The API endpoint URL.
 * @returns {Promise<Object>} The response data.
 */
export async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
  }
  