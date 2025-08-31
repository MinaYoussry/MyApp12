import React from 'react';
import { 
  Sparkles, 
  Scissors, 
  Palette, 
  Archive, 
  RefreshCw, 
  Settings, 
  Heart, 
  Droplets 
} from 'lucide-react-native';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export const allTools: Tool[] = [
  {
    id: 'image-enhancer',
    name: 'Image Enhancer',
    description: 'Enhance image quality and resolution with AI-powered upscaling technology.',
    icon: React.createElement(Sparkles, { size: 24, color: 'white' }),
    color: '#8B5CF6',
  },
  {
    id: 'background-remover',
    name: 'Background Remover',
    description: 'Remove backgrounds instantly with precision AI detection and cutout.',
    icon: React.createElement(Scissors, { size: 24, color: 'white' }),
    color: '#3B82F6',
  },
  {
    id: 'ai-art-generator',
    name: 'AI Art Generator',
    description: 'Create stunning artwork and images from text prompts using advanced AI.',
    icon: React.createElement(Palette, { size: 24, color: 'white' }),
    color: '#10B981',
  },
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    description: 'Reduce file size while maintaining quality with smart compression algorithms.',
    icon: React.createElement(Archive, { size: 24, color: 'white' }),
    color: '#F59E0B',
  },
  {
    id: 'format-converter',
    name: 'Format Converter',
    description: 'Convert between different image formats (PNG, JPG, WebP, SVG) seamlessly.',
    icon: React.createElement(RefreshCw, { size: 24, color: 'white' }),
    color: '#8B5CF6',
  },
  {
    id: 'auto-adjust',
    name: 'Auto Adjust',
    description: 'Automatically optimize brightness, contrast, and colors for perfect results.',
    icon: React.createElement(Settings, { size: 24, color: 'white' }),
    color: '#F59E0B',
  },
  {
    id: 'cartoonizer',
    name: 'Cartoonizer',
    description: 'Transform photos into cartoon-style illustrations with artistic AI filters.',
    icon: React.createElement(Heart, { size: 24, color: 'white' }),
    color: '#EF4444',
  },
  {
    id: 'image-colorizer',
    name: 'Image Colorizer',
    description: 'Add realistic colors to black and white photos using deep learning.',
    icon: React.createElement(Droplets, { size: 24, color: 'white' }),
    color: '#3B82F6',
  },
];

export const featuredTools = allTools.slice(0, 4);