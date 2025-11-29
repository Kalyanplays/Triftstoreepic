import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { FilterState } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

const categories = ['All', 'Outerwear', 'Tops', 'Bottoms', 'Footwear', 'Accessories'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', '28', '30', '32', '34', '7', '8', '9', '10', 'One Size'];
const conditions = ['Excellent', 'Good', 'Fair'];
const sustainabilityTags = ['Eco-Certified', 'Carbon Neutral', 'Recycled Materials'];

export function FilterPanel({ filters, onFilterChange, onClose, isMobile }: FilterPanelProps) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    size: true,
    condition: true,
    price: true,
    sustainability: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryToggle = (category: string) => {
    if (category === 'All') {
      onFilterChange({ ...filters, categories: [] });
    } else {
      const newCategories = filters.categories.includes(category)
        ? filters.categories.filter(c => c !== category)
        : [...filters.categories, category];
      onFilterChange({ ...filters, categories: newCategories });
    }
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: newSizes });
  };

  const handleConditionToggle = (condition: string) => {
    const newConditions = filters.conditions.includes(condition)
      ? filters.conditions.filter(c => c !== condition)
      : [...filters.conditions, condition];
    onFilterChange({ ...filters, conditions: newConditions });
  };

  const handleSustainabilityToggle = (tag: string) => {
    const newTags = filters.sustainabilityTags.includes(tag)
      ? filters.sustainabilityTags.filter(t => t !== tag)
      : [...filters.sustainabilityTags, tag];
    onFilterChange({ ...filters, sustainabilityTags: newTags });
  };

  const FilterSection = ({ 
    title, 
    section, 
    children 
  }: { 
    title: string; 
    section: keyof typeof expandedSections; 
    children: React.ReactNode;
  }) => (
    <div className="border-b border-white/10 pb-4">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full mb-3 text-white hover:text-gray-300 transition-colors"
      >
        <span className="font-medium">{title}</span>
        {expandedSections[section] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      <AnimatePresence>
        {expandedSections[section] && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className={`glass-card p-6 ${isMobile ? 'h-full overflow-y-auto' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white">Filters</h2>
        {isMobile && onClose && (
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category */}
        <FilterSection title="Category" section="category">
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={category === 'All' ? filters.categories.length === 0 : filters.categories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-gradient-to-r checked:from-[var(--color-neon-blue)] checked:to-[var(--color-neon-purple)] focus:ring-2 focus:ring-[var(--color-neon-blue)]"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Size */}
        <FilterSection title="Size" section="size">
          <div className="flex flex-wrap gap-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  filters.sizes.includes(size)
                    ? 'bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] text-white'
                    : 'glass-card text-gray-300 hover:text-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Condition */}
        <FilterSection title="Condition" section="condition">
          <div className="space-y-2">
            {conditions.map(condition => (
              <label key={condition} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.conditions.includes(condition)}
                  onChange={() => handleConditionToggle(condition)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-gradient-to-r checked:from-[var(--color-neon-blue)] checked:to-[var(--color-neon-purple)] focus:ring-2 focus:ring-[var(--color-neon-blue)]"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {condition}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range" section="price">
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="200"
              value={filters.priceRange[1]}
              onChange={(e) => onFilterChange({
                ...filters,
                priceRange: [filters.priceRange[0], parseInt(e.target.value)]
              })}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-300">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </FilterSection>

        {/* Sustainability */}
        <FilterSection title="Sustainability" section="sustainability">
          <div className="space-y-2">
            {sustainabilityTags.map(tag => (
              <label key={tag} className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.sustainabilityTags.includes(tag)}
                  onChange={() => handleSustainabilityToggle(tag)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-gradient-to-r checked:from-green-500 checked:to-emerald-500 focus:ring-2 focus:ring-green-500"
                />
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {tag}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );
}
