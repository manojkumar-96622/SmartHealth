import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Heart, Droplet, Footprints, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Progress = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('health_stats')
        .select('*')
        .eq('user_id', user.id)
        .order('recorded_at', { ascending: true })
        .limit(30);

      if (!error && data) {
        setStats(data);
      }
      setLoading(false);
    };

    fetchStats();
  }, [user, navigate]);

  const latestStats = stats[stats.length - 1] || {
    weight: 0,
    steps: 0,
    calories_burned: 0,
    water_intake: 0,
    bmi: 0,
  };

  const chartData = stats.map((stat) => ({
    date: new Date(stat.recorded_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    weight: stat.weight,
    steps: stat.steps,
    calories: stat.calories_burned,
  }));

  const milestones = [
    { title: 'First Week Complete', achieved: stats.length >= 7, icon: Award },
    { title: '10,000 Steps in a Day', achieved: stats.some(s => s.steps >= 10000), icon: Footprints },
    { title: 'Consistent for 30 Days', achieved: stats.length >= 30, icon: Target },
    { title: 'Goal Weight Reached', achieved: false, icon: TrendingUp },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Your Progress
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Track your health journey and celebrate your achievements
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <Heart className="w-8 h-8 text-red-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">BMI</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {latestStats.bmi?.toFixed(1) || 'N/A'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Body Mass Index</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <Footprints className="w-8 h-8 text-blue-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Today</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {latestStats.steps?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Steps</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-green-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Burned</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {latestStats.calories_burned?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Calories</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <Droplet className="w-8 h-8 text-cyan-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Daily</span>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {latestStats.water_intake?.toFixed(1) || 0}L
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Water Intake</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Weight Trend
              </h2>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#F3F4F6',
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="weight" stroke="#3B82F6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-20">
                  No data available yet. Start tracking your progress!
                </p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Activity Overview
              </h2>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData.slice(-7)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#F3F4F6',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="steps" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-20">
                  No data available yet. Start tracking your progress!
                </p>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Milestones
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 ${
                    milestone.achieved
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'
                  }`}
                >
                  <milestone.icon
                    className={`w-10 h-10 mb-3 ${
                      milestone.achieved ? 'text-green-500' : 'text-gray-400'
                    }`}
                  />
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {milestone.title}
                  </h3>
                  <p className={`text-sm ${
                    milestone.achieved ? 'text-green-600 dark:text-green-400' : 'text-gray-500'
                  }`}>
                    {milestone.achieved ? 'Completed!' : 'In Progress'}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Keep Going!
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You're making great progress. Remember to stay consistent with your health goals and celebrate every milestone along the way.
            </p>
            <button
              onClick={() => navigate('/diary')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Log Today's Activity
            </button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
