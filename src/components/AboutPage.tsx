import { Heart, Leaf, Users, Target, Recycle, Globe, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);

  const values = [
    {
      icon: Leaf,
      title: 'Sustainability First',
      description: 'We believe fashion should never come at the cost of our planet. Every item we curate reduces waste and carbon emissions.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Heart,
      title: 'Quality Over Quantity',
      description: 'Each piece is carefully inspected and authenticated. We only offer items that meet our high standards for quality and condition.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by fashion lovers, for fashion lovers. Our community is at the heart of everything we do.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Recycle,
      title: 'Circular Economy',
      description: 'We champion circular fashion — extending the life of quality pieces and keeping them out of landfills.',
      color: 'from-purple-500 to-violet-500'
    }
  ];

  const milestones = [
    { year: '2023', title: 'Founded', description: 'Trift was born from a passion for sustainable fashion' },
    { year: '10K+', title: 'Items Saved', description: 'Thousands of pieces given a second life' },
    { year: '8K+', title: 'Happy Customers', description: 'Building a community of conscious consumers' },
    { year: '95%', title: 'CO2 Reduced', description: 'Compared to buying new fashion items' },
  ];

  const team = [
    {
      name: 'Sustainability',
      role: 'Our Core Mission',
      description: 'Every purchase helps reduce fashion waste',
      image: 'https://images.unsplash.com/photo-1587502537815-0c8b5c9ba39a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMHN1c3RhaW5hYmlsaXR5fGVufDF8fHx8MTc2NDQwNzkxM3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Innovation',
      role: 'Future Forward',
      description: 'Blending technology with conscious fashion',
      image: 'https://images.unsplash.com/photo-1509881511796-3a0c5a059ec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXJjdWxhciUyMGVjb25vbXl8ZW58MXx8fHwxNzY0NDA3OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Community',
      role: 'Together We Thrive',
      description: 'Building a movement of sustainable shoppers',
      image: 'https://images.unsplash.com/photo-1758613654311-32525f489a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdGVhbSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjQ0MDc5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[70vh] overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1713261749235-901031087be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGZhc2hpb24lMjBoZXJvfGVufDF8fHx8MTc2NDQwNzkxMnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="About Trift"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[var(--color-charcoal)]" />
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="relative h-full flex items-center justify-center text-center px-4"
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="glass-card-neon p-8 md:p-12 liquid-surface"
            >
              <h1 className="text-white mb-4">About Trift</h1>
              <p className="text-xl text-gray-300">
                Redefining fashion through sustainability, authenticity, and conscious consumption
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Trift was born from a simple observation: the fashion industry creates billions of pounds of waste each year, 
                  while perfectly good clothing sits unused in closets around the world.
                </p>
                <p>
                  We saw an opportunity to bridge this gap — to create a platform where quality pre-loved fashion could find 
                  new life, where sustainability meets style, and where every purchase makes a positive impact.
                </p>
                <p>
                  Today, we're proud to be part of a growing movement of conscious consumers who understand that the most 
                  sustainable garment is the one that already exists. Through careful curation, quality verification, and a 
                  commitment to transparency, we're making sustainable fashion accessible to everyone.
                </p>
              </div>
            </div>

            <div className="glass-card-neon p-8 liquid-surface">
              <div className="grid grid-cols-2 gap-4">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="glass-card p-6 text-center"
                  >
                    <div className="text-3xl bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] bg-clip-text text-transparent mb-2">
                      {milestone.year}
                    </div>
                    <div className="text-white mb-1">{milestone.title}</div>
                    <div className="text-xs text-gray-400">{milestone.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 glass-card-neon p-12 text-center liquid-surface"
        >
          <Target className="w-16 h-16 mx-auto mb-6 text-[var(--color-neon-blue)]" />
          <h2 className="text-white mb-4">Our Mission</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            To revolutionize the fashion industry by making sustainable, high-quality pre-loved fashion 
            the first choice for conscious consumers worldwide.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-white mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="glass-card-neon p-8 liquid-surface"
              >
                <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${value.color} bg-opacity-20 flex items-center justify-center`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white mb-3">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-white mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="glass-card-neon overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white mb-1">{item.name}</h3>
                    <p className="text-sm text-[var(--color-neon-blue)] mb-2">{item.role}</p>
                    <p className="text-sm text-gray-300">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Environmental Impact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 glass-card-neon p-12 liquid-surface"
        >
          <div className="text-center mb-12">
            <Globe className="w-16 h-16 mx-auto mb-6 text-green-500" />
            <h2 className="text-white mb-4">Environmental Impact</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              The fashion industry is one of the world's largest polluters. By choosing pre-loved fashion, 
              you're making a real difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center">
              <div className="text-4xl mb-2">💧</div>
              <div className="text-2xl text-[var(--color-neon-blue)] mb-2">2,700L</div>
              <p className="text-sm text-gray-400">Water saved per garment vs. new production</p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="text-4xl mb-2">🌱</div>
              <div className="text-2xl text-green-500 mb-2">6.5kg</div>
              <p className="text-sm text-gray-400">CO2 emissions avoided per item</p>
            </div>

            <div className="glass-card p-6 text-center">
              <div className="text-4xl mb-2">♻️</div>
              <div className="text-2xl text-[var(--color-neon-purple)] mb-2">100%</div>
              <p className="text-sm text-gray-400">Of items get a second chance</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card-neon p-12 text-center liquid-surface"
        >
          <h2 className="text-white mb-4">Join the Movement</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Every purchase you make is a vote for a more sustainable future. Together, we can transform 
            the fashion industry one item at a time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('shop')}
              className="px-8 py-4 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('collections')}
              className="px-8 py-4 glass-card hover:bg-white/10 rounded-lg transition-colors"
            >
              Browse Collections
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
