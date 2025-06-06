import axios from 'axios';

// Error Treatment
const onReject = (error) => {
  if (typeof error.response === 'undefined') {
    console.error('Network error or CORS issue. Check your connection.');
    return Promise.reject(error);
  }

  if (error.response) {
    const response = error.response;

    // 400 Bad Request
    if (response.status === 400 && response.data?.Error) {
      console.error('Error 400:', response.data.Error);
      return Promise.reject(error);
    }

    // 401 Unauthorized
    if (response.status === 401) {
      if (response.data?.Error === 'Token is expired') {
        localStorage.removeItem('token');
        window.location.href = '/signin';
        return Promise.reject(error);
      }

      console.error('Unauthorized: No permission to perform this operation.');
      return Promise.reject(error);
    }

    // 404 Not Found
    if (response.status === 404) {
      console.error('Error 404: Resource not found on API.');
      return Promise.reject(error);
    }

    // 422 Unprocessable Entity (Validation)
    if (response.status === 422) {
      if (response.data?.errors) {
        const errors = response.data.errors;
        Object.keys(errors).forEach((field) => {
          const messages = errors[field];
          if (Array.isArray(messages)) {
            messages.forEach(msg => console.error(`Validation error on ${field}: ${msg}`));
          } else {
            console.error(`Validation error on ${field}: ${messages}`);
          }
        });
      }

      if (response.data?.Error) {
        console.error('Error 422:', response.data.Error);
      }
    }

    // 500 Internal Server Error
    if (response.status === 500) {
      console.error('Server Error 500. Check the server logs.');
      if (response.data?.Error) {
        console.error('Server message:', response.data.Error);
      }
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
};

// Attach error handler globally
axios.interceptors.response.use(
  (response) => response,
  onReject
);

// API instance
const axiosWithAuth = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
  baseURL: `/api`,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
});

// Attach error handling to instance
axiosWithAuth.interceptors.response.use(
  (response) => response,
  onReject
);

// Function to attach bearer token
axiosWithAuth.useBearerToken = () => {
  const token = localStorage.getItem("token");
  const hasNoInterceptor = !axiosWithAuth.interceptors.request.handlers
    || axiosWithAuth.interceptors.request.handlers.length === 0;

  if (hasNoInterceptor && token) {
    axiosWithAuth.interceptors.request.use(
      (config) => {
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  return axiosWithAuth;
};

export {
  axios,
  axiosWithAuth
};
