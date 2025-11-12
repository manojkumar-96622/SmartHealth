import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Plus, Trash2, FileText, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FoodEntry {
  name: string;
  calories: number;
  time: string;
}

interface ExerciseEntry {
  name: string;
  duration: number;
  calories: number;
}

export const Diary = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [foodLog, setFoodLog] = useState<FoodEntry[]>([]);
  const [exerciseLog, setExerciseLog] = useState<ExerciseEntry[]>([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  const [newFood, setNewFood] = useState({ name: '', calories: 0, time: '08:00' });
  const [newExercise, setNewExercise] = useState({ name: '', duration: 0, calories: 0 });
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    loadDiaryEntry();
  }, [user, navigate, selectedDate]);

  const loadDiaryEntry = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('diary_entries')
      .select('*')
      .eq('user_id', user.id)
      .eq('entry_date', selectedDate)
      .maybeSingle();

    if (data) {
      setFoodLog(data.food_log || []);
      setExerciseLog(data.exercise_log || []);
      setNotes(data.notes || '');
    } else {
      setFoodLog([]);
      setExerciseLog([]);
      setNotes('');
    }
    setLoading(false);
  };

  const saveDiaryEntry = async () => {
    if (!user) return;

    const { data: existing } = await supabase
      .from('diary_entries')
      .select('id')
      .eq('user_id', user.id)
      .eq('entry_date', selectedDate)
      .maybeSingle();

    const entryData = {
      user_id: user.id,
      entry_date: selectedDate,
      food_log: foodLog,
      exercise_log: exerciseLog,
      notes,
    };

    if (existing) {
      await supabase
        .from('diary_entries')
        .update(entryData)
        .eq('id', existing.id);
    } else {
      await supabase.from('diary_entries').insert(entryData);
    }
  };

  const addFood = () => {
    if (newFood.name && newFood.calories > 0) {
      const updated = [...foodLog, newFood];
      setFoodLog(updated);
      setNewFood({ name: '', calories: 0, time: '08:00' });
    }
  };

  const addExercise = () => {
    if (newExercise.name && newExercise.duration > 0) {
      const updated = [...exerciseLog, newExercise];
      setExerciseLog(updated);
      setNewExercise({ name: '', duration: 0, calories: 0 });
    }
  };

  const removeFood = (index: number) => {
    setFoodLog(foodLog.filter((_, i) => i !== index));
  };

  const removeExercise = (index: number) => {
    setExerciseLog(exerciseLog.filter((_, i) => i !== index));
  };

  const totalCaloriesConsumed = foodLog.reduce((sum, food) => sum + food.calories, 0);
  const totalCaloriesBurned = exerciseLog.reduce((sum, ex) => sum + ex.calories, 0);
  const netCalories = totalCaloriesConsumed - totalCaloriesBurned;

  const generateReport = () => {
    setShowReport(true);
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Daily Diary
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track your food and exercise
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Calories Consumed
              </h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {totalCaloriesConsumed}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Calories Burned
              </h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {totalCaloriesBurned}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Net Calories
              </h3>
              <p className={`text-3xl font-bold ${
                netCalories > 0 ? 'text-orange-600 dark:text-orange-400' : 'text-purple-600 dark:text-purple-400'
              }`}>
                {netCalories}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Food Log
              </h2>

              <div className="space-y-4 mb-6">
                {foodLog.map((food, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {food.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {food.calories} cal • {food.time}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFood(index)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <input
                  type="text"
                  value={newFood.name}
                  onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                  placeholder="Food name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={newFood.calories}
                    onChange={(e) => setNewFood({ ...newFood, calories: Number(e.target.value) })}
                    placeholder="Calories"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="time"
                    value={newFood.time}
                    onChange={(e) => setNewFood({ ...newFood, time: e.target.value })}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <button
                  onClick={addFood}
                  className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Food
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Exercise Log
              </h2>

              <div className="space-y-4 mb-6">
                {exerciseLog.map((exercise, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {exercise.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {exercise.duration} min • {exercise.calories} cal burned
                      </p>
                    </div>
                    <button
                      onClick={() => removeExercise(index)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <input
                  type="text"
                  value={newExercise.name}
                  onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                  placeholder="Exercise name"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    value={newExercise.duration}
                    onChange={(e) => setNewExercise({ ...newExercise, duration: Number(e.target.value) })}
                    placeholder="Duration (min)"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <input
                    type="number"
                    value={newExercise.calories}
                    onChange={(e) => setNewExercise({ ...newExercise, calories: Number(e.target.value) })}
                    placeholder="Calories"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <button
                  onClick={addExercise}
                  className="w-full flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Exercise
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Notes
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How are you feeling today? Any observations?"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={saveDiaryEntry}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Save Entry
            </button>
            <button
              onClick={generateReport}
              className="flex items-center px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
            >
              <FileText className="w-5 h-5 mr-2" />
              Generate Report
            </button>
          </div>

          {showReport && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Daily Report - {new Date(selectedDate).toLocaleDateString()}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Summary
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Consumed</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {totalCaloriesConsumed} cal
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Burned</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {totalCaloriesBurned} cal
                      </p>
                    </div>
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Net</p>
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {netCalories} cal
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Recommendations
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start text-gray-700 dark:text-gray-300">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                      <span>
                        {netCalories > 500
                          ? 'Consider adding more physical activity to balance your calorie intake.'
                          : netCalories < -500
                          ? 'Make sure you\'re eating enough to fuel your activities.'
                          : 'Great job maintaining a balanced calorie intake!'}
                      </span>
                    </li>
                    <li className="flex items-start text-gray-700 dark:text-gray-300">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                      <span>Stay hydrated by drinking at least 8 glasses of water today.</span>
                    </li>
                    <li className="flex items-start text-gray-700 dark:text-gray-300">
                      <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
                      <span>Track your progress consistently for better insights.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setShowReport(false)}
                className="mt-6 px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                Close Report
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};
