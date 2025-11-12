import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { TrendingDown, TrendingUp, Target, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Programs = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userPrograms, setUserPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchPrograms = async () => {
      const { data } = await supabase
        .from('programs')
        .select('*')
        .eq('user_id', user.id);

      if (data) {
        setUserPrograms(data);
      }
      setLoading(false);
    };

    fetchPrograms();
  }, [user, navigate]);

  const programs = [
    {
      id: 'weight_loss',
      title: 'Weight Loss Program',
      icon: TrendingDown,
      description: 'Achieve your ideal weight with personalized meal plans and exercise routines.',
      benefits: [
        'Custom calorie deficit planning',
        'Weekly progress tracking',
        'Nutrition guidance',
        'Exercise recommendations',
      ],
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 'weight_gain',
      title: 'Weight Gain Program',
      icon: TrendingUp,
      description: 'Build healthy muscle mass with structured nutrition and strength training.',
      benefits: [
        'Calorie surplus strategies',
        'Muscle-building workouts',
        'Protein-rich meal plans',
        'Progress monitoring',
      ],
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'maintenance',
      title: 'Weight Maintenance',
      icon: Target,
      description: 'Maintain your current weight and focus on overall health and wellness.',
      benefits: [
        'Balanced nutrition plans',
        'Lifestyle habit building',
        'Energy level optimization',
        'Long-term sustainability',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  const isEnrolled = (programId: string) => {
    return userPrograms.some(p => p.program_type === programId && p.status === 'active');
  };

  const handleJoinProgram = async (programId: string) => {
    if (!user) return;

    const { error } = await supabase.from('programs').insert({
      user_id: user.id,
      program_type: programId,
      status: 'active',
      start_date: new Date().toISOString(),
    });

    if (!error) {
      const { data } = await supabase
        .from('programs')
        .select('*')
        .eq('user_id', user.id);

      if (data) {
        setUserPrograms(data);
      }
    }
  };

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
            Health Programs
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Choose a personalized program to achieve your health goals
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
              >
                <div className={`h-32 bg-gradient-to-r ${program.color} flex items-center justify-center`}>
                  <program.icon className="w-16 h-16 text-white" />
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {program.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {program.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>

                  {isEnrolled(program.id) ? (
                    <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                      <span className="text-green-700 dark:text-green-400 font-semibold">
                        Currently Enrolled
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleJoinProgram(program.id)}
                      className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Join Program
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {userPrograms.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Your Active Programs
              </h2>
              <div className="space-y-4">
                {userPrograms
                  .filter(p => p.status === 'active')
                  .map((program) => {
                    const programInfo = programs.find(p => p.id === program.program_type);
                    const startDate = new Date(program.start_date);
                    const daysEnrolled = Math.floor((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));

                    return (
                      <div
                        key={program.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                      >
                        <div className="flex items-center">
                          {programInfo && <programInfo.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-4" />}
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {programInfo?.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Started {startDate.toLocaleDateString()} • {daysEnrolled} days enrolled
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                          Active
                        </span>
                      </div>
                    );
                  })}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};
