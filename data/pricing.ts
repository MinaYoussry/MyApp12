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

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out our AI tools',
    features: [
      '2 images per day',
      'Basic AI tools access',
      'Standard processing speed',
      '720p output resolution',
      'Community support',
    ],
    buttonText: 'Get Started Free',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$10',
    period: 'month',
    description: 'Ideal for creators and professionals',
    features: [
      '10 images per day',
      'All AI tools access',
      'Priority processing',
      '4K output resolution',
      'Email support',
      'Batch processing',
      'API access',
    ],
    isPopular: true,
    buttonText: 'Upgrade to Pro',
  },
  {
    id: 'max',
    name: 'Max',
    price: '$49',
    period: 'lifetime',
    description: 'One-time payment for unlimited access',
    features: [
      '50 images per day',
      'All AI tools access',
      'Fastest processing',
      '8K output resolution',
      'Priority support',
      'Batch processing',
      'Full API access',
      'Custom models',
    ],
    buttonText: 'Buy Lifetime Access',
  },
];