import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import axios from 'axios'
import './index.css'
import App from './App.tsx'
import './i18n/config';

import { toast } from 'sonner';

// Set globally for production deployment so it can point to the backend server
axios.defaults.baseURL = import.meta.env.VITE_API_URL || '';

// Global Error Interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Specifically ignore 401s since they are handled uniquely by the Login form
    if (error.response?.status !== 401 && error.response?.status !== 404) {
      toast.error(error.response?.data?.message || 'A network error occurred. Please check your connection.');
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
