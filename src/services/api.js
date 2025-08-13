import axios from 'axios';

const API_BASE_URL = 'https://crmbackend-fahc.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
};

// Leads API
export const leadsAPI = {
  getAll: (params) => api.get('/leads', { params }),
  getAllLeads: (params) => api.get('/leads/all', { params }), // New endpoint for all leads
  getById: (id) => api.get(`/leads/${id}`),
  create: (leadData) => api.post('/leads', leadData),
  update: (id, leadData) => api.put(`/leads/${id}`, leadData),
  delete: (id) => api.delete(`/leads/${id}`),
  addNote: (id, noteData) => api.post(`/leads/${id}/notes`, noteData),
  getStats: () => api.get('/leads/stats/overview'),
  getWinLossStats: () => api.get('/leads/stats/win-loss'),
  updateStage: (id, stage) => api.patch(`/leads/${id}/stage`, { stage }),
};

// Users API
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
  // Employee management
  getEmployees: () => api.get('/users/employees'),
  createEmployee: (employeeData) => api.post('/users/employees', employeeData),
};

// Pipeline API
export const pipelineAPI = {
  get: () => api.get('/pipeline'),
  save: (columns) => api.post('/pipeline', { columns }),
  getAll: () => api.get('/pipeline/all'),
  create: (name, stages) => api.post('/pipeline/all', { name, stages }),
  rename: (id, name) => api.put(`/pipeline/${id}`, { name }),
  delete: (id) => api.delete(`/pipeline/${id}`),
  update: (id, data) => api.put(`/pipeline/${id}`, data),
};

// Tasks API
export const tasksAPI = {
  getAll: (params) => api.get('/tasks', { params }),
  getAllTasks: (params) => api.get('/tasks/all', { params }), // New endpoint for all tasks
  getById: (id) => api.get(`/tasks/${id}`),
  create: (taskData) => api.post('/tasks', taskData),
  update: (id, taskData) => api.put(`/tasks/${id}`, taskData),
  delete: (id) => api.delete(`/tasks/${id}`),
  getAssignableUsers: () => api.get('/tasks/assignable-users'),
  // New endpoints for calendar and task management
  getCalendarTasks: (userId) => api.get(`/tasks/calendar/${userId}`),
  updateStatus: (id, status) => api.put(`/tasks/${id}/status`, { status }),
  getUserTasks: (userId) => api.get(`/tasks/user/${userId}`),
};

// Activity Logs API
export const activityLogsAPI = {
  getAll: (params) => api.get('/activity-logs', { params }),
  getById: (id) => api.get(`/activity-logs/${id}`),
  create: (activityData) => api.post('/activity-logs', activityData),
  delete: (id) => api.delete(`/activity-logs/${id}`),
};

// Invoices API
export const invoicesAPI = { 
  getAll: (params) => api.get('/invoices', { params }),
  getById: (id) => api.get(`/invoices/${id}`),
  create: (invoiceData) => api.post('/invoices', invoiceData),
  update: (id, invoiceData) => api.put(`/invoices/${id}`, invoiceData),
  delete: (id) => api.delete(`/invoices/${id}`),
  markAsPaid: (id, paymentData) => api.patch(`/invoices/${id}/mark-paid`, paymentData),
  getStats: () => api.get('/invoices/stats/overview'),
};

// Admin API
export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getAdvertisements: () => api.get('/admin/advertisements'),
  createAdvertisement: (data) => api.post('/admin/advertisements', data),
  updateAdvertisement: (id, data) => api.put(`/admin/advertisements/${id}`, data),
  deleteAdvertisement: (id) => api.delete(`/admin/advertisements/${id}`),
  getPackages: () => api.get('/admin/packages'),
  createPackage: (data) => api.post('/admin/packages', data),
  updatePackage: (id, data) => api.put(`/admin/packages/${id}`, data),
  getUsers: () => api.get('/admin/users'),
  getUserDetails: (id) => api.get(`/admin/users/${id}`),
  getPermissions: () => api.get('/admin/permissions'),
  updateUserPermissions: (id, permissions) => api.put(`/admin/users/${id}/permissions`, { permissions }),
  getActivityLogs: () => api.get('/admin/activity-logs'),
  getMonthlyAnalytics: () => api.get('/admin/analytics/monthly'),
  getExpiryAlerts: () => api.get('/admin/expiry-alerts'),
  renewPackage: (userId, data) => api.post(`/admin/users/${userId}/renew-package`, data),
  getMessages: () => api.get('/admin/messages'),
  resendMessage: (messageId, data) => api.post(`/admin/messages/${messageId}/resend`, data),
  deleteMessage: (messageId) => api.delete(`/admin/messages/${messageId}`),
  sendMessage: (data) => api.post('/admin/messages', data),
};

// Company Dashboard APIs
export const companyAPI = {
  // Get company statistics
  getCompanyStats: (dateRange = 'month') => 
    api.get(`/admin/company-stats?dateRange=${dateRange}`),

  // Get revenue data
  getRevenueData: (dateRange = 'month') => 
    api.get(`/admin/revenue-data?dateRange=${dateRange}`),

  // Get team performance
  getTeamPerformance: () => 
    api.get('/admin/team-performance'),

  // Get payment history
  getPaymentHistory: () => 
    api.get('/admin/payment-history'),

  // Get user activity
  getUserActivity: () => 
    api.get('/admin/user-activity'),

  // Get blocked users
  getBlockedUsers: () => 
    api.get('/admin/blocked-users'),

  // Get login history
  getLoginHistory: () => 
    api.get('/admin/login-history'),

  // Block user
  blockUser: (userId) => 
    api.post(`/admin/block-user/${userId}`),

  // Unblock user
  unblockUser: (userId) => 
    api.post(`/admin/unblock-user/${userId}`),

  // Send message
  sendMessage: (data) => 
    api.post('/admin/send-message', data),

  // Update employee
  updateEmployee: (employeeId, data) => 
    api.put(`/admin/employees/${employeeId}`, data),

  // LinkedIn Integration APIs
  getLinkedInStatus: () => 
    api.get('/admin/linkedin/status'),
  
  connectLinkedIn: (authCode) => 
    api.post('/admin/linkedin/connect', { authCode }),
  
  syncLinkedInLeads: () => 
    api.post('/admin/linkedin/sync'),
  
  getLinkedInLeads: (params) => 
    api.get('/admin/linkedin/leads', { params }),
  
  disconnectLinkedIn: () => 
    api.delete('/admin/linkedin/disconnect'),
};

export default api; 