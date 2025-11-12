# Smart Health - AI-Powered Health Management Platform

A full-stack web application for managing personal health with AI-powered features including disease scanning, health assistant chatbot, progress tracking, and community support.

## Features

### Core Functionality
- **Authentication**: Secure email/password authentication with Supabase Auth
- **Dark/Light Mode**: Theme toggle with localStorage persistence
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Smooth Animations**: Framer Motion animations throughout

### Health Management
- **AI Disease Scanner**: Upload or capture images for AI-powered health analysis
- **AI Health Chatbot**: Floating chat bubble with intelligent health Q&A
- **Progress Tracking**: Visual charts and metrics for health stats
- **Health Programs**: Weight loss, gain, and maintenance programs
- **Daily Diary**: Food and exercise logging with report generation

### Community & Content
- **Community Forum**: Discussion board with posts and replies
- **Health Blog**: Curated health articles and insights
- **Resources**: Verified health information sources
- **Daily Health Tips**: Evidence-based wellness tips

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Lucide React** for icons

### Backend
- **Supabase** for database and authentication
- **Supabase Edge Functions** for serverless API endpoints
- **PostgreSQL** with Row Level Security

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation with theme toggle
│   ├── Layout.tsx          # Page layout wrapper
│   └── Chatbot.tsx         # Floating AI chatbot
├── contexts/
│   ├── AuthContext.tsx     # Authentication state
│   └── ThemeContext.tsx    # Theme management
├── lib/
│   └── supabase.ts         # Supabase client config
├── pages/
│   ├── Home.tsx            # Landing page
│   ├── Login.tsx           # Login page
│   ├── Signup.tsx          # Signup page
│   ├── Progress.tsx        # Health stats dashboard
│   ├── Programs.tsx        # Health programs
│   ├── Scanner.tsx         # AI disease scanner
│   ├── Community.tsx       # Forum
│   ├── Diary.tsx           # Daily logs
│   ├── Blog.tsx            # Articles
│   ├── Resources.tsx       # Health resources
│   └── Tips.tsx            # Health tips
└── App.tsx                 # Root component
```

## Database Schema

### Tables
- **profiles**: User profiles with theme preferences
- **health_stats**: Daily health metrics (weight, steps, calories, water)
- **programs**: User-enrolled health programs
- **forum_posts**: Community posts
- **forum_replies**: Post replies
- **diary_entries**: Daily food and exercise logs
- **scan_history**: AI scan results
- **chat_conversations**: Chatbot conversation history

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

## Edge Functions

The app uses two Supabase Edge Functions:

### 1. Scanner Function (`/functions/v1/scan`)
- Accepts image data for analysis
- Returns detected condition, confidence level, and prevention tips
- Currently uses placeholder AI logic (can be replaced with TensorFlow.js or external ML API)

### 2. Chat Function (`/functions/v1/chat`)
- Processes health-related questions
- Provides context-aware responses
- Maintains conversation history
- Currently uses pattern matching (can be replaced with OpenAI API)

## Key Features Implementation

### Authentication Flow
- Sign up with email, password, and full name
- Automatic profile creation in database
- Session persistence with Supabase Auth
- Protected routes requiring authentication

### Theme System
- Class-based dark mode with Tailwind CSS
- Stored in localStorage
- Applied via context provider
- Instant theme switching

### AI Scanner
- Camera access via `navigator.mediaDevices.getUserMedia`
- Image upload support
- Real-time analysis with loading states
- Results saved to scan history

### Chatbot
- Floating bubble UI (bottom-right)
- Message history persistence
- Real-time responses
- Conversation context awareness

### Progress Tracking
- Recharts for data visualization
- Line charts for weight trends
- Bar charts for activity levels
- Milestone tracking system

### Community Forum
- Create and view posts
- Reply to discussions
- Like posts
- Category filtering

### Diary System
- Food logging with calorie tracking
- Exercise logging with duration
- Daily notes
- Report generation with recommendations

## Design System

### Colors
- **Light Mode**: White (#F8F9FA) background
- **Dark Mode**: Dark Navy (#0D1117) background
- **Accent**: Blue gradients (from-blue-600 to-purple-600)

### Typography
- Clean, modern font stack
- Responsive text sizes
- Proper hierarchy

### Components
- Rounded corners (rounded-xl, rounded-lg)
- Subtle shadows
- Smooth transitions
- Hover effects

## Security

### Row Level Security (RLS)
All database tables have RLS enabled with policies ensuring:
- Users can only access their own data
- Community content is readable by all authenticated users
- Write operations restricted to data owners

### Authentication
- Secure password handling by Supabase
- JWT-based sessions
- Protected API routes

## Future Enhancements

- Integration with real ML models for disease detection
- OpenAI API integration for advanced chatbot
- Wearable device integration (Fitbit, Apple Health)
- Social features (following, activity feed)
- Meal planning and recipes
- Appointment scheduling
- Medication reminders
- Export data as PDF
- Multi-language support

## License

This project is for educational purposes.

## Support

For issues or questions, please open an issue in the repository.
