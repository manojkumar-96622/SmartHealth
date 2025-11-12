import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { Lightbulb, Heart, Brain, Activity, Apple, Moon } from 'lucide-react';

export const Tips = () => {
  const [dailyTip, setDailyTip] = useState(0);

  const tips = [
    {
      icon: Heart,
      category: 'Cardiovascular Health',
      title: 'Take the Stairs',
      description: 'Simple daily changes like taking the stairs instead of the elevator can significantly improve your cardiovascular health over time.',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Brain,
      category: 'Mental Wellness',
      title: 'Practice Mindfulness',
      description: 'Spend 5 minutes each day practicing mindfulness or meditation to reduce stress and improve mental clarity.',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Activity,
      category: 'Physical Activity',
      title: 'Move Every Hour',
      description: 'Set a reminder to stand up and move for 2-3 minutes every hour to counteract the effects of prolonged sitting.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Apple,
      category: 'Nutrition',
      title: 'Eat the Rainbow',
      description: 'Include fruits and vegetables of different colors in your meals to ensure you\'re getting a wide range of nutrients.',
      color: 'from-orange-500 to-yellow-500',
    },
    {
      icon: Moon,
      category: 'Sleep Health',
      title: 'Consistent Sleep Schedule',
      description: 'Go to bed and wake up at the same time every day, even on weekends, to regulate your body\'s internal clock.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Lightbulb,
      category: 'Hydration',
      title: 'Start Your Day with Water',
      description: 'Drink a glass of water first thing in the morning to rehydrate your body after sleep and kickstart your metabolism.',
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  const allTips = [
    'Aim for at least 150 minutes of moderate aerobic activity per week',
    'Include strength training exercises at least twice a week',
    'Limit processed foods and added sugars in your diet',
    'Get 7-9 hours of quality sleep each night',
    'Practice good posture to prevent back and neck pain',
    'Wash your hands regularly to prevent illness',
    'Take breaks from screens to reduce eye strain',
    'Stay connected with friends and family for emotional well-being',
    'Learn to manage stress through healthy coping mechanisms',
    'Schedule regular check-ups with your healthcare provider',
    'Limit alcohol consumption to moderate levels',
    'Quit smoking or avoid starting if you don\'t smoke',
    'Protect your skin from sun damage with SPF',
    'Practice gratitude daily to improve mental health',
    'Set realistic health goals and track your progress',
    'Listen to your body and rest when needed',
    'Include fiber-rich foods in every meal',
    'Reduce sodium intake to support heart health',
    'Stay mentally active with puzzles or learning new skills',
    'Build a support network for your health journey',
  ];

  useEffect(() => {
    const today = new Date().getDate();
    setDailyTip(today % tips.length);
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Daily Health Tips
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Evidence-based tips to improve your wellness
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-12 text-white"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Today's Featured Tip</h2>
            </div>

            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              {(() => {
                const TipIcon = tips[dailyTip].icon;
                return <TipIcon className="w-12 h-12 mb-4" />;
              })()}
              <span className="text-sm font-semibold opacity-90 block mb-2">
                {tips[dailyTip].category}
              </span>
              <h3 className="text-2xl font-bold mb-3">{tips[dailyTip].title}</h3>
              <p className="text-lg opacity-90">{tips[dailyTip].description}</p>
            </div>
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            All Categories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <div className={`h-32 bg-gradient-to-r ${tip.color} flex items-center justify-center`}>
                  <tip.icon className="w-16 h-16 text-white" />
                </div>

                <div className="p-6">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 block mb-2">
                    {tip.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {tip.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Quick Health Tips
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="flex items-start p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <span className="inline-block w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Remember
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Small, consistent changes lead to big results over time. Choose one or two tips to focus on and build from there. Always consult with healthcare professionals before making significant changes to your health routine.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
