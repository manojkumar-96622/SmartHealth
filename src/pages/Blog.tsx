import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { BookOpen, Clock, User } from 'lucide-react';

export const Blog = () => {
  const articles = [
    {
      id: 1,
      title: '10 Simple Ways to Boost Your Immune System',
      excerpt: 'Discover evidence-based strategies to strengthen your immune system naturally through diet, exercise, and lifestyle changes.',
      author: 'Dr. Sarah Johnson',
      date: '2024-11-10',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Wellness',
    },
    {
      id: 2,
      title: 'The Science of Sleep: Why It Matters',
      excerpt: 'Learn about the critical role sleep plays in your overall health and get practical tips for improving your sleep quality.',
      author: 'Dr. Michael Chen',
      date: '2024-11-08',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Sleep Health',
    },
    {
      id: 3,
      title: 'Nutrition 101: Building a Balanced Diet',
      excerpt: 'Master the fundamentals of nutrition and learn how to create meal plans that support your health goals.',
      author: 'Emily Rodriguez, RD',
      date: '2024-11-05',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Nutrition',
    },
    {
      id: 4,
      title: 'Mental Health Matters: Stress Management Techniques',
      excerpt: 'Explore effective strategies for managing stress and maintaining mental well-being in daily life.',
      author: 'Dr. James Wilson',
      date: '2024-11-03',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/3772612/pexels-photo-3772612.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Mental Health',
    },
    {
      id: 5,
      title: 'The Benefits of Regular Exercise',
      excerpt: 'Understand how consistent physical activity can transform your health and discover ways to stay motivated.',
      author: 'Lisa Thompson, PT',
      date: '2024-11-01',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Fitness',
    },
    {
      id: 6,
      title: 'Hydration: The Foundation of Health',
      excerpt: 'Learn why staying hydrated is crucial for your body and how to ensure you\'re drinking enough water.',
      author: 'Dr. Sarah Johnson',
      date: '2024-10-28',
      readTime: '4 min read',
      image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Wellness',
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Health Blog
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Expert insights and evidence-based health information
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                    {article.category}
                  </span>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-3">
                    {article.title}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {article.readTime}
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
