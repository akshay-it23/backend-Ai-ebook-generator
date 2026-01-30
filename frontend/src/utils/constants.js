// API Base URL - will be set via environment variable in production
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
  PROFILE: '/api/auth/profile',
  
  // Books
  BOOKS: '/api/book',
  BOOK_BY_ID: (id) => `/api/book/${id}`,
  BOOK_COVER: (id) => `/api/book/cover/${id}`,
  
  // AI
  GENERATE_CHAPTER: '/api/ai/generate',
  
  // Export
  EXPORT_PDF: '/api/export/pdf',
  EXPORT_DOCX: '/api/export/docx',
};

// App Constants
export const APP_NAME = 'AI E-Book Creator';
export const APP_DESCRIPTION = 'Create stunning e-books with AI-powered content generation';

// Book Status
export const BOOK_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
};

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_TITLE_LENGTH: 100,
  MAX_SUBTITLE_LENGTH: 200,
  MAX_CHAPTER_TITLE_LENGTH: 100,
};
