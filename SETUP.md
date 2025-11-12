# Smart Health Setup Guide

## Quick Start

### Step 1: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   Get these values from your Supabase dashboard at:
   - Project Settings > API > Project URL
   - Project Settings > API > anon/public key

### Step 2: Database Setup

The database schema has already been created with the migration. It includes:

- User profiles with theme preferences
- Health statistics tracking
- Program enrollment
- Community forum (posts and replies)
- Daily diary entries
- AI scan history
- Chat conversation storage

All tables have Row Level Security (RLS) enabled for data protection.

### Step 3: Edge Functions

Two Edge Functions are deployed:

1. **scan** (`/functions/v1/scan`)
   - Analyzes health images
   - Returns condition, confidence, and tips
   - Currently uses simulated AI (can be replaced with real ML model)

2. **chat** (`/functions/v1/chat`)
   - Health Q&A assistant
   - Context-aware responses
   - Pattern-based matching (can be integrated with OpenAI API)

These are already deployed and configured.

### Step 4: Install Dependencies

```bash
npm install
```

### Step 5: Run Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## First Time Usage

### 1. Create an Account
- Click "Sign Up" in the navigation
- Enter your email, password, and full name
- You'll be automatically logged in

### 2. Explore Features

**Home Page**
- Overview of features
- Testimonials
- Call to action

**Progress Page**
- View health statistics
- Track milestones
- See trends with charts

**Programs**
- Join weight loss, gain, or maintenance programs
- Track active programs

**AI Scanner**
- Use camera or upload images
- Get AI-powered health analysis
- View prevention tips

**Community Forum**
- Create posts
- Reply to discussions
- Like and engage with others

**Daily Diary**
- Log food and exercise
- Generate daily reports
- Track calorie balance

**Blog, Resources, Tips**
- Read health articles
- Access verified resources
- Get daily health tips

**AI Chatbot** (Floating button)
- Ask health questions
- Get instant responses
- Conversation saved automatically

### 3. Theme Toggle
- Click the sun/moon icon in the navbar
- Switch between light and dark modes
- Preference saved automatically

## Testing the Application

### Test User Journey

1. **Sign Up**: Create a new account
2. **Scanner**: Upload a test image to see AI analysis
3. **Chatbot**: Ask "How much exercise should I do?"
4. **Diary**: Log today's meals and exercises
5. **Programs**: Join a health program
6. **Community**: Create a post and reply to it
7. **Progress**: View your dashboard (will show data as you log)

### Example Health Stats Entry

To see data in the Progress page, you'll need to add health stats. This can be done via:
- The Diary page (logs are saved)
- Direct database insertion (for testing)

## Customization

### Adding Real AI Models

#### Scanner
Replace the placeholder logic in `supabase/functions/scan/index.ts`:
- Integrate TensorFlow.js for client-side ML
- Connect to external ML APIs (e.g., Google Vision API)
- Use custom trained models

#### Chatbot
Update `supabase/functions/chat/index.ts`:
- Integrate OpenAI API
- Use other LLM providers
- Add retrieval-augmented generation (RAG)

### Styling
- Edit `tailwind.config.js` for custom colors
- Update theme colors in `ThemeContext.tsx`
- Modify component styles in individual page files

### Features
- Add new pages in `src/pages/`
- Register routes in `src/App.tsx`
- Create new database tables via migrations

## Troubleshooting

### "Missing Supabase environment variables"
- Ensure `.env` file exists
- Check variable names start with `VITE_`
- Restart dev server after changes

### Authentication Issues
- Verify Supabase project is active
- Check API keys are correct
- Ensure email auth is enabled in Supabase dashboard

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`
- Check for TypeScript errors: `npm run typecheck`

### Edge Function Errors
- Functions are already deployed
- Check function logs in Supabase dashboard
- Verify CORS headers are included

## Production Deployment

### Build
```bash
npm run build
```

### Deploy
The app can be deployed to:
- Vercel (recommended for Vite apps)
- Netlify
- Cloudflare Pages
- Any static hosting service

Set environment variables in your deployment platform's settings.

## Support

For issues:
1. Check the README.md for detailed documentation
2. Review Supabase dashboard for database/auth issues
3. Check browser console for client-side errors
4. Review Edge Function logs in Supabase

## Next Steps

1. Add your own health data
2. Customize the theme and branding
3. Integrate real AI models
4. Add more features based on your needs
5. Deploy to production

Happy health tracking! 🏥💪
