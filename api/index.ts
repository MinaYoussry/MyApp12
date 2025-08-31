import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'https://api.allophoto.ai', // Replace with your actual API URL
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // In a real app, you'd get this from AsyncStorage
    const token = null; // await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      // In a real app, you might logout the user here
    }
    return Promise.reject(error);
  }
);

// API methods for all services shown in screenshots
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (email: string, password: string, name: string) =>
    api.post('/auth/register', { email, password, name }),
  
  logout: () => api.post('/auth/logout'),
  
  refreshToken: () => api.post('/auth/refresh'),
  
  socialLogin: (provider: 'google' | 'github', token: string) =>
    api.post('/auth/social', { provider, token }),
};

export const toolsAPI = {
  // Image Enhancer
  enhanceImage: (imageData: FormData) =>
    api.post('/tools/image-enhancer/process', imageData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  // Background Remover
  removeBackground: (imageData: FormData) =>
    api.post('/tools/background-remover/process', imageData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  // AI Art Generator
  generateArt: (prompt: string, style?: string) =>
    api.post('/tools/ai-art-generator/generate', { prompt, style }),
  
  // Image Compressor
  compressImage: (imageData: FormData, quality: number) =>
    api.post('/tools/image-compressor/process', imageData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { quality },
    }),
  
  // Format Converter
  convertFormat: (imageData: FormData, targetFormat: string) =>
    api.post('/tools/format-converter/process', imageData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { format: targetFormat },
    }),
  
  // Auto Adjust
  autoAdjust: (imageData: FormData) =>
    api.post('/tools/auto-adjust/process', imageData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  // Cartoonizer
  cartoonize: (imageData: FormData, style?: string) =>
    api.post('/tools/cartoonizer/process', imageData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { style },
    }),
  
  // Image Colorizer
  colorizeImage: (imageData: FormData) =>
    api.post('/tools/image-colorizer/process', imageData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  // General tool processing
  processImage: (toolId: string, imageData: FormData) =>
    api.post(`/tools/${toolId}/process`, imageData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  getHistory: () => api.get('/tools/history'),
  
  downloadResult: (resultId: string) =>
    api.get(`/tools/download/${resultId}`, {
      responseType: 'blob',
    }),
};

export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  
  updateProfile: (data: any) => api.put('/user/profile', data),
  
  getUsage: () => api.get('/user/usage'),
  
  getSubscription: () => api.get('/user/subscription'),
  
  updateSubscription: (planId: string) => 
    api.post('/user/subscription', { planId }),
};

export const pricingAPI = {
  getPlans: () => api.get('/pricing/plans'),
  
  createCheckoutSession: (planId: string) =>
    api.post('/pricing/checkout', { planId }),
  
  cancelSubscription: () => api.delete('/user/subscription'),
  
  getBillingHistory: () => api.get('/user/billing/history'),
};

export { api };