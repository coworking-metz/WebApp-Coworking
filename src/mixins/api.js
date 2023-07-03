// apiMixin.js
import { ref } from 'vue';

function objectToQueryString(obj) {
  const params = new URLSearchParams();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, obj[key]);
    }
  }
  return params.toString();
}

export function useApi() {
  const isLoading = ref(false);

  async function post(uri, payload = null, options = {}) {
    options.method = 'POST';
    return await query(uri, payload, options).then((response) => response.json());
  }
  async function get(uri, payload = null, options = {}) {
    options.method = 'GET';
    uri += `?${objectToQueryString(payload)}`;
    return await query(uri, null, options).then((response) => response.json());
  }
  async function query(uri, payload = null, options = {}) {
    try {
      isLoading.value = true;

      options.headers = options.headers || {};
      options.headers['Content-Type'] = 'application/json';
      options.headers.Authorization = import.meta.env.VITE_APP_AUTH_TOKEN;
      if (payload) {
        options.body = JSON.stringify(payload);
      }

      let url = uri;
      if (!uri.includes('http')) {
        url = import.meta.env.VITE_WP_API_ROOT + uri;
      }

      const response = await fetch(url, options);
      return response;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('API Error');
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    get,
    post,
    query,
  };
}
