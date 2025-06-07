import { ReactNode } from 'react';

// Section data types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  spiceLevel: 1 | 2 | 3;
  imageUrl: string;
  category: 'starters' | 'mains' | 'desserts' | 'drinks';
  isVegetarian: boolean;
  isSpecial?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: 'food' | 'restaurant' | 'events';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  imageUrl: string;
}

export interface Section {
  id: string;
  title: string;
  component: ReactNode;
}

// Loading state
export interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// Animation props
export interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}