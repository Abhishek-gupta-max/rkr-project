import api from './api';

export const userService = {
  // Public submissions
  submitApplication: async (formData) => {
    // Requires multipart/form-data for multi-file uploads
    const response = await api.post('/apply.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  
  submitContactForm: async (contactData) => {
    const response = await api.post('/contact.php', contactData);
    return response.data;
  },

  // Admin application management
  adminGetApplications: async (params = {}) => {
    let query = '';
    if (typeof params === 'string') {
      query = `?search=${encodeURIComponent(params)}`;
    } else {
      const searchParams = new URLSearchParams();
      if (params.search) searchParams.append('search', params.search);
      if (params.trade) searchParams.append('trade', params.trade);
      if (params.status) searchParams.append('status', params.status);
      if (params.sort) searchParams.append('sort', params.sort);
      query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    }

    const response = await api.get(`/admin/applications.php${query}`);
    return response.data;
  },
  
  adminGetApplicationDetail: async (id) => {
    const response = await api.get(`/admin/applications.php?id=${id}`);
    return response.data;
  },
  
  adminUpdateApplicationStatus: async (id, status) => {
    const response = await api.post('/admin/applications.php', {
      action: 'update_status',
      id,
      status
    });
    return response.data;
  },

  adminUpdateApplicationNotes: async (id, admin_notes) => {
    const response = await api.post('/admin/applications.php', {
      action: 'update_notes',
      id,
      notes: admin_notes
    });
    return response.data;
  },
  
  adminDeleteApplication: async (id) => {
    const response = await api.delete(`/admin/applications.php?id=${id}`);
    return response.data;
  },

  adminGetSettings: async () => {
    const response = await api.get('/admin/settings.php');
    return response.data;
  }
};

export default userService;
