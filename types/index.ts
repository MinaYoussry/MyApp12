export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  subscription?: 'free' | 'pro' | 'max';
  usage?: {
    daily: number;
    limit: number;
  };
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  category?: string;
}

export interface ProcessingResult {
  id: string;
  toolId: string;
  originalImage: string;
  processedImage: string;
  createdAt: string;
  status: 'processing' | 'completed' | 'failed';
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}