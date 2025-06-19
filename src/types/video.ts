export interface VideoGenerationRequest {
  productName: string;
  keyFeatures: string;
  targetAudience: string;
  tone: string;
  videoStyle: string;
  duration: number;
}

export interface VideoGenerationResponse {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: number;
  resolution: string;
  format: string;
  fileSize: string;
  generatedAt: string;
  prompt: string;
}

export interface VideoGenerationError {
  message: string;
  code: string;
  details?: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: VideoGenerationError;
}
