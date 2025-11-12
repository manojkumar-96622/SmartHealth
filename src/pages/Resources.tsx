import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { ExternalLink, BookOpen, Video, FileText, Podcast } from 'lucide-react';

export const Resources = () => {
  const resources = [
    {
      id: 1,
      title: 'World Health Organization (WHO)',
      description: 'Official health information and guidelines from the WHO',
      url: 'https://www.who.int/',
      icon: ExternalLink,
      category: 'Official',
    },
    {
      id: 2,
      title: 'CDC Health Topics',
      description: 'Comprehensive health information from the Centers for Disease Control',
      url: 'https://www.cdc.gov/',
      icon: ExternalLink,
      category: 'Official',
    },
    {
      id: 3,
      title: 'NIH MedlinePlus',
      description: 'Trusted health information from the National Institutes of Health',
      url: 'https://medlineplus.gov/',
      icon: BookOpen,
      category: 'Research',
    },
    {
      id: 4,
      title: 'Mayo Clinic Health Library',
      description: 'Reliable health information from Mayo Clinic experts',
      url: 'https://www.mayoclinic.org/',
      icon: BookOpen,
      category: 'Medical',
    },
    {
      id: 5,
      title: 'Harvard Health Publishing',
      description: 'Evidence-based health information from Harvard Medical School',
      url: 'https://www.health.harvard.edu/',
      icon: FileText,
      category: 'Research',
    },
    {
      id: 6,
      title: 'Nutrition.gov',
      description: 'Federal guidance on nutrition and dietary guidelines',
      url: 'https://www.nutrition.gov/',
      icon: BookOpen,
      category: 'Nutrition',
    },
    {
      id: 7,
      title: 'American Heart Association',
      description: 'Information on heart health and cardiovascular wellness',
      url: 'https://www.heart.org/',
      icon: ExternalLink,
      category: 'Medical',
    },
    {
      id: 8,
      title: 'Mental Health America',
      description: 'Resources for mental health awareness and support',
      url: 'https://www.mhanational.org/',
      icon: ExternalLink,
      category: 'Mental Health',
    },
  ];

  const categories = ['All', 'Official', 'Research', 'Medical', 'Nutrition', 'Mental Health'];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Health Resources
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Verified and trusted health information sources
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              These resources provide general health information. Always consult with healthcare professionals for personalized medical advice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <motion.a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <resource.icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                    {resource.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {resource.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {resource.description}
                </p>

                <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold">
                  Visit Resource
                  <ExternalLink className="w-4 h-4 ml-2" />
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Emergency Resources
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🚨</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Emergency Services
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Call 108  for immediate medical emergencies
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">💬</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Crisis Text Line
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Text HOME to 741741 for 24/7 crisis support
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">☎️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    National Suicide Prevention Lifeline
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Call 100 for free, confidential support 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
