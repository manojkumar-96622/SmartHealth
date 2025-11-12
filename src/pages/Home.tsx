import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, Brain, Camera, MessageCircle, TrendingUp, Users, Heart, Shield } from 'lucide-react';

export const Home = () => {
  const features = [
    {
      icon: Camera,
      title: 'AI Disease Scanner',
      description: 'Instantly analyze health conditions using advanced AI technology and get prevention tips.',
    },
    {
      icon: MessageCircle,
      title: 'Health Assistant',
      description: 'Chat with our AI health assistant for personalized advice and answers to your questions.',
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your health metrics, milestones, and improvements with detailed analytics.',
    },
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Connect with others on similar health journeys, share experiences, and get support.',
    },
    {
      icon: Brain,
      title: 'Smart Programs',
      description: 'Personalized weight management programs tailored to your specific health goals.',
    },
    {
      icon: Heart,
      title: 'Daily Health Tips',
      description: 'Receive evidence-based health tips and resources to improve your wellness journey.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      content: 'Smart Health has completely transformed my approach to wellness. The AI scanner and personalized programs are game-changers!',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      name: 'Michael Chen',
      role: 'Health Coach',
      content: 'The community forum and progress tracking features keep me motivated every day. This app is a must-have for anyone serious about their health.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Nutrition Student',
      content: 'The AI health assistant provides incredibly accurate and helpful advice. It feels like having a personal health expert in my pocket.',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
    },
  ];

  return (
    <div className="bg-[#F8F9FA] dark:bg-[#0D1117]">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <Activity className="w-20 h-20 text-blue-600 dark:text-blue-400" />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Reinventing Wellness,
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Through AI</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
             Empower your health with AI-driven insights, real-time scanning, and a community that cares.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                to="/scanner"
                className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors shadow-lg border border-gray-200 dark:border-gray-700"
              >
                Try AI Scanner
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need for a healthier lifestyle
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-[#F8F9FA] dark:bg-gray-800 rounded-xl hover:shadow-xl transition-shadow"
              >
                <feature.icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Join thousands of satisfied users transforming their health
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{testimonial.content}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600 dark:bg-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Your Health Journey Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join Smart Health and take control of your wellness with AI-powered insights
            </p>
            <Link
              to="/signup"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Create Free Account
            </Link>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 bg-gray-900 dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Activity className="w-8 h-8 text-blue-400 mr-2" />
              <span className="text-xl font-bold text-white">Smart Health</span>
            </div>
            <p className="text-gray-400 text-center md:text-left">
              © 2025 Smart Health. Empowering healthier lives with AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
