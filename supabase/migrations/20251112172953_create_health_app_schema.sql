/*
  # Smart Health App Database Schema

  ## Overview
  Creates the complete database schema for the Smart Health Web Application
  
  ## New Tables
  
  ### 1. profiles
  - `id` (uuid, references auth.users)
  - `email` (text)
  - `full_name` (text)
  - `avatar_url` (text, optional)
  - `theme_preference` (text, default 'light')
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### 2. health_stats
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `weight` (numeric)
  - `height` (numeric)
  - `bmi` (numeric)
  - `steps` (integer)
  - `calories_burned` (integer)
  - `water_intake` (numeric)
  - `recorded_at` (timestamptz)
  
  ### 3. programs
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `program_type` (text: 'weight_loss', 'weight_gain', 'maintenance')
  - `status` (text: 'active', 'completed', 'paused')
  - `start_date` (timestamptz)
  - `target_date` (timestamptz)
  - `created_at` (timestamptz)
  
  ### 4. forum_posts
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `title` (text)
  - `content` (text)
  - `category` (text)
  - `likes` (integer, default 0)
  - `created_at` (timestamptz)
  
  ### 5. forum_replies
  - `id` (uuid, primary key)
  - `post_id` (uuid, references forum_posts)
  - `user_id` (uuid, references profiles)
  - `content` (text)
  - `created_at` (timestamptz)
  
  ### 6. diary_entries
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `entry_date` (date)
  - `food_log` (jsonb)
  - `exercise_log` (jsonb)
  - `notes` (text)
  - `created_at` (timestamptz)
  
  ### 7. scan_history
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `image_url` (text)
  - `detected_condition` (text)
  - `confidence` (numeric)
  - `prevention_tips` (jsonb)
  - `scanned_at` (timestamptz)
  
  ### 8. chat_conversations
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `messages` (jsonb)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to manage their own data
  - Implement secure read access for community features
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  theme_preference text DEFAULT 'light',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create health_stats table
CREATE TABLE IF NOT EXISTS health_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  weight numeric,
  height numeric,
  bmi numeric,
  steps integer DEFAULT 0,
  calories_burned integer DEFAULT 0,
  water_intake numeric DEFAULT 0,
  recorded_at timestamptz DEFAULT now()
);

ALTER TABLE health_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own health stats"
  ON health_stats FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own health stats"
  ON health_stats FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own health stats"
  ON health_stats FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  program_type text NOT NULL,
  status text DEFAULT 'active',
  start_date timestamptz DEFAULT now(),
  target_date timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own programs"
  ON programs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own programs"
  ON programs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own programs"
  ON programs FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own programs"
  ON programs FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create forum_posts table
CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  category text DEFAULT 'general',
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view forum posts"
  ON forum_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own forum posts"
  ON forum_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own forum posts"
  ON forum_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own forum posts"
  ON forum_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create forum_replies table
CREATE TABLE IF NOT EXISTS forum_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES forum_posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view forum replies"
  ON forum_replies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own forum replies"
  ON forum_replies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own forum replies"
  ON forum_replies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own forum replies"
  ON forum_replies FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create diary_entries table
CREATE TABLE IF NOT EXISTS diary_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  entry_date date NOT NULL,
  food_log jsonb DEFAULT '[]'::jsonb,
  exercise_log jsonb DEFAULT '[]'::jsonb,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own diary entries"
  ON diary_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own diary entries"
  ON diary_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own diary entries"
  ON diary_entries FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own diary entries"
  ON diary_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create scan_history table
CREATE TABLE IF NOT EXISTS scan_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  image_url text,
  detected_condition text NOT NULL,
  confidence numeric NOT NULL,
  prevention_tips jsonb DEFAULT '[]'::jsonb,
  scanned_at timestamptz DEFAULT now()
);

ALTER TABLE scan_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scan history"
  ON scan_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scan history"
  ON scan_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create chat_conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  messages jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chat conversations"
  ON chat_conversations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat conversations"
  ON chat_conversations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chat conversations"
  ON chat_conversations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_health_stats_user_id ON health_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_health_stats_recorded_at ON health_stats(recorded_at);
CREATE INDEX IF NOT EXISTS idx_programs_user_id ON programs(user_id);
CREATE INDEX IF NOT EXISTS idx_forum_posts_created_at ON forum_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_replies_post_id ON forum_replies(post_id);
CREATE INDEX IF NOT EXISTS idx_diary_entries_user_id_date ON diary_entries(user_id, entry_date);
CREATE INDEX IF NOT EXISTS idx_scan_history_user_id ON scan_history(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_user_id ON chat_conversations(user_id);