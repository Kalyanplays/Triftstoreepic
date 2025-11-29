export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  size: string[];
  condition: 'Excellent' | 'Good' | 'Fair';
  sustainabilityTag?: string;
  description: string;
  material?: string;
  brand?: string;
  images?: string[];
}

export interface Collection {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  heroImage: string;
  products: Product[];
  moodboardImages: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface FilterState {
  categories: string[];
  sizes: string[];
  conditions: string[];
  priceRange: [number, number];
  sustainabilityTags: string[];
}
