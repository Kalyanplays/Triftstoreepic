import { Product, Collection } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Vintage Leather Jacket',
    price: 89.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1760533091973-1262bf57d244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2xvdGhpbmclMjBmYXNoaW9ufGVufDF8fHx8MTc2NDM4ODEzOXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Outerwear',
    size: ['S', 'M', 'L'],
    condition: 'Excellent',
    sustainabilityTag: 'Eco-Certified',
    description: 'Classic brown leather jacket with timeless appeal. Genuine leather, well-maintained with minimal wear. Perfect for adding edge to any outfit.',
    material: 'Genuine Leather',
    brand: 'Vintage Collection',
    images: [
      'https://images.unsplash.com/photo-1760533091973-1262bf57d244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2xvdGhpbmclMjBmYXNoaW9ufGVufDF8fHx8MTc2NDM4ODEzOXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1721038536740-28c98e8ded81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJpZnQlMjBzdG9yZSUyMGl0ZW1zfGVufDF8fHx8MTc2NDM1MTUzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    ]
  },
  {
    id: '2',
    name: 'Designer Handbag',
    price: 149.99,
    originalPrice: 450.00,
    image: 'https://images.unsplash.com/photo-1601924928357-22d3b3abfcfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhhbmRiYWd8ZW58MXx8fHwxNzY0MzYyNzc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Accessories',
    size: ['One Size'],
    condition: 'Good',
    sustainabilityTag: 'Carbon Neutral',
    description: 'Luxurious designer handbag in excellent condition. Features premium materials and impeccable craftsmanship.',
    material: 'Premium Leather',
    brand: 'Designer Label',
    images: [
      'https://images.unsplash.com/photo-1601924928357-22d3b3abfcfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGhhbmRiYWd8ZW58MXx8fHwxNzY0MzYyNzc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    ]
  },
  {
    id: '3',
    name: 'Retro Sneakers',
    price: 59.99,
    originalPrice: 120.00,
    image: 'https://images.unsplash.com/photo-1758665630748-08141996c144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc25lYWtlcnMlMjBzaG9lc3xlbnwxfHx8fDE3NjQyOTcwMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Footwear',
    size: ['7', '8', '9', '10'],
    condition: 'Good',
    description: 'Classic retro sneakers with vintage charm. Comfortable and stylish for everyday wear.',
    material: 'Canvas & Rubber',
    brand: 'Athletic Co.',
    images: [
      'https://images.unsplash.com/photo-1758665630748-08141996c144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc25lYWtlcnMlMjBzaG9lc3xlbnwxfHx8fDE3NjQyOTcwMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ]
  },
  {
    id: '4',
    name: 'Vintage Sunglasses',
    price: 34.99,
    originalPrice: 89.99,
    image: 'https://images.unsplash.com/photo-1756725520224-8fe4bdd87983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMHN1bmdsYXNzZXN8ZW58MXx8fHwxNzY0NDA3MjMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Accessories',
    size: ['One Size'],
    condition: 'Excellent',
    sustainabilityTag: 'Recycled Materials',
    description: 'Stylish vintage sunglasses with retro flair. UV protection and timeless design.',
    material: 'Acetate',
    brand: 'Retro Vision',
    images: [
      'https://images.unsplash.com/photo-1756725520224-8fe4bdd87983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMHN1bmdsYXNzZXN8ZW58MXx8fHwxNzY0NDA3MjMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ]
  },
  {
    id: '5',
    name: 'Classic Denim Jeans',
    price: 44.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1741939483735-6923b430ca89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGVuaW0lMjBqZWFuc3xlbnwxfHx8fDE3NjQ0MDcyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Bottoms',
    size: ['28', '30', '32', '34'],
    condition: 'Good',
    sustainabilityTag: 'Eco-Certified',
    description: 'Timeless denim jeans with perfect fade. Comfortable fit with vintage character.',
    material: 'Denim',
    brand: 'Classic Denim Co.',
    images: [
      'https://images.unsplash.com/photo-1741939483735-6923b430ca89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGVuaW0lMjBqZWFuc3xlbnwxfHx8fDE3NjQ0MDcyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ]
  },
  {
    id: '6',
    name: 'Sustainable Accessories Set',
    price: 29.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1665702860632-4dfcd4b2d869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb24lMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NjQ0MDcyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Accessories',
    size: ['One Size'],
    condition: 'Excellent',
    sustainabilityTag: 'Recycled Materials',
    description: 'Eco-friendly accessories made from sustainable materials. Perfect for conscious consumers.',
    material: 'Recycled Materials',
    brand: 'Eco Fashion',
    images: [
      'https://images.unsplash.com/photo-1665702860632-4dfcd4b2d869?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb24lMjBhY2Nlc3Nvcmllc3xlbnwxfHx8fDE3NjQ0MDcyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ]
  },
  {
    id: '7',
    name: 'Thrift Store Finds',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1721038536740-28c98e8ded81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJpZnQlMjBzdG9yZSUyMGl0ZW1zfGVufDF8fHx8MTc2NDM1MTUzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tops',
    size: ['XS', 'S', 'M'],
    condition: 'Fair',
    description: 'Unique vintage pieces with character. Each item tells a story.',
    material: 'Mixed',
    brand: 'Vintage',
    images: [
      'https://images.unsplash.com/photo-1721038536740-28c98e8ded81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJpZnQlMjBzdG9yZSUyMGl0ZW1zfGVufDF8fHx8MTc2NDM1MTUzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    ]
  },
  {
    id: '8',
    name: 'Sustainable Collection Item',
    price: 79.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1709710279941-fa6c9b4b60f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb24lMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2NDQwNzIzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Tops',
    size: ['S', 'M', 'L', 'XL'],
    condition: 'Excellent',
    sustainabilityTag: 'Carbon Neutral',
    description: 'Premium sustainable fashion piece. Ethically sourced and environmentally conscious.',
    material: 'Organic Cotton',
    brand: 'Sustainable Brand',
    images: [
      'https://images.unsplash.com/photo-1709710279941-fa6c9b4b60f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb24lMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2NDQwNzIzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    ]
  },
];

export const collections: Collection[] = [
  {
    id: 'winter-essentials',
    name: 'Winter Essentials',
    subtitle: 'Curated warmth for conscious consumers',
    description: 'Discover our carefully selected winter collection featuring timeless pieces that blend sustainability with style. Each item has been hand-picked for its quality, durability, and minimal environmental impact. From vintage leather jackets to sustainable accessories, this collection represents the best of circular fashion.',
    heroImage: 'https://images.unsplash.com/photo-1760533091973-1262bf57d244?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2xvdGhpbmclMjBmYXNoaW9ufGVufDF8fHx8MTc2NDM4ODEzOXww&ixlib=rb-4.1.0&q=80&w=1080',
    products: [products[0], products[1], products[4], products[7]],
    moodboardImages: [
      'https://images.unsplash.com/photo-1709710279941-fa6c9b4b60f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb24lMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2NDQwNzIzMHww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1601234979142-1fb9d0431bce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGJhbm5lcnxlbnwxfHx8fDE3NjQ0MDcyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1721038536740-28c98e8ded81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJpZnQlMjBzdG9yZSUyMGl0ZW1zfGVufDF8fHx8MTc2NDM1MTUzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    ]
  },
  {
    id: 'vintage-classics',
    name: 'Vintage Classics',
    subtitle: 'Timeless pieces with a story',
    description: 'Step into the past with our vintage classics collection. These carefully restored pieces bring the best of previous decades into modern wardrobes. Each item has been authenticated and restored to ensure you receive quality that lasts. Embrace slow fashion and make a statement with pieces that have stood the test of time.',
    heroImage: 'https://images.unsplash.com/photo-1601234979142-1fb9d0431bce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZmFzaGlvbiUyMGJhbm5lcnxlbnwxfHx8fDE3NjQ0MDcyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    products: [products[2], products[3], products[6]],
    moodboardImages: [
      'https://images.unsplash.com/photo-1758665630748-08141996c144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc25lYWtlcnMlMjBzaG9lc3xlbnwxfHx8fDE3NjQyOTcwMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1756725520224-8fe4bdd87983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMHN1bmdsYXNzZXN8ZW58MXx8fHwxNzY0NDA3MjMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1741939483735-6923b430ca89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZGVuaW0lMjBqZWFuc3xlbnwxfHx8fDE3NjQ0MDcyMzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ]
  }
];
