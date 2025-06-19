/**
 * Environment configuration for the application
 */

export const config = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001",
  VIDEO_API_KEY: import.meta.env.VITE_VIDEO_API_KEY || "",

  // Application Settings
  APP_NAME: "Suplimax Video Generator",
  APP_VERSION: "1.0.0",

  // Video Generation Settings
  MAX_VIDEO_DURATION: 120, // seconds
  MIN_VIDEO_DURATION: 10, // seconds
  SUPPORTED_FORMATS: [ "mp4", "webm", "mov" ],
  SUPPORTED_RESOLUTIONS: [ "1920x1080", "1280x720", "854x480" ],

  // Mock Settings
  ENABLE_MOCK_API: import.meta.env.VITE_ENABLE_MOCK_API === "true" || import.meta.env.DEV,
  MOCK_DELAY_MIN: 2000, // ms
  MOCK_DELAY_MAX: 5000, // ms
} as const;

export type Config = typeof config;
