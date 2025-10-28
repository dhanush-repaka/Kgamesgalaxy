// API service for production and preview environments
class ApiService {
  constructor() {
    // Use environment variable in production, relative path in preview
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    
    // If we have a backend URL (Netlify), use it. Otherwise use relative path (preview)
    this.baseUrl = backendUrl || '';
    console.log('API Service initialized with baseUrl:', this.baseUrl || 'relative paths');
  }

  async makeRequest(endpoint, options = {}) {
    const { method = 'GET', body, headers = {}, timeout = 15000 } = options;
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      // Construct full URL
      const url = this.baseUrl ? `${this.baseUrl}/api${endpoint}` : `/api${endpoint}`;
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error (${response.status}): ${errorText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${method} ${endpoint}`, error);
      throw error;
    }
  }
}

const apiService = new ApiService();

// Booking service
export const bookingService = {
  create: async (bookingData) => {
    return await apiService.makeRequest('/bookings', {
      method: 'POST',
      body: bookingData,
    });
  },
  
  getAll: async () => {
    return await apiService.makeRequest('/bookings');
  },
  
  getById: async (id) => {
    return await apiService.makeRequest(`/bookings/${id}`);
  },
  
  getByReference: async (referenceNumber) => {
    return await apiService.makeRequest(`/bookings/reference/${referenceNumber}`);
  },
  
  cancelByReference: async (referenceNumber) => {
    return await apiService.makeRequest(`/bookings/reference/${referenceNumber}/cancel`, {
      method: 'POST',
    });
  },
  
  update: async (id, data) => {
    return await apiService.makeRequest(`/bookings/${id}`, {
      method: 'PUT',
      body: data,
    });
  },
  
  delete: async (id) => {
    return await apiService.makeRequest(`/bookings/${id}`, {
      method: 'DELETE',
    });
  }
};

// Availability service
export const availabilityService = {
  getByDate: async (date) => {
    let dateStr = date;
    if (date instanceof Date) {
      // Format as local YYYY-MM-DD to avoid timezone shifting from toISOString()
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      dateStr = `${y}-${m}-${d}`;
    }
    return await apiService.makeRequest(`/availability/${dateStr}`);
  }
};

// Game type service
export const gameTypeService = {
  getAll: async () => {
    return await apiService.makeRequest('/game-types');
  }
};

// Gallery service
export const galleryService = {
  getAll: async () => {
    return await apiService.makeRequest('/gallery');
  },
  
  create: async (imageData) => {
    return await apiService.makeRequest('/gallery', {
      method: 'POST',
      body: imageData,
    });
  }
};

// Settings service
export const settingsService = {
  get: async () => {
    return await apiService.makeRequest('/settings');
  }
};

// Convenience function for creating bookings (backward compatibility)
export const createBooking = bookingService.create;

// Export the api service instance as well
export default apiService;