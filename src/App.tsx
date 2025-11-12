import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Progress } from './pages/Progress';
import { Programs } from './pages/Programs';
import { Scanner } from './pages/Scanner';
import { Community } from './pages/Community';
import { Diary } from './pages/Diary';
import { Blog } from './pages/Blog';
import { Resources } from './pages/Resources';
import { Tips } from './pages/Tips';
import { Chatbot } from './components/Chatbot';
import { About } from './pages/About';


function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
          <Chatbot />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0D1117] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/community" element={<Community />} />
      <Route path="/diary" element={<Diary />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/tips" element={<Tips />} />
      <Route path="/about" element={<About />} />

    </Routes>
  );
}

export default App;
