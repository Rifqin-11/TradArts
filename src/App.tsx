import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import InstrumentsPage from './pages/InstrumentsPage';
import InstrumentDetail from './pages/InstrumentDetail';
import TutorialsPage from './pages/TutorialsPage';
import TutorialPlayerPage from './pages/TutorialPlayerPage';
import SongsPage from './pages/SongsPage';
import SongDetail from './pages/SongDetail';
import CommunityPage from './pages/CommunityPage';
import ChallengesPage from './pages/ChallengesPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import EventsPage from './pages/EventsPage';
import AchievementsPage from './pages/AchievementsPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import FAQPage from './pages/FAQPage';

// Context providers
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="instruments" element={<InstrumentsPage />} />
              <Route path="instruments/:id" element={<InstrumentDetail />} />
              <Route path="tutorials" element={<TutorialsPage />} />
              <Route path="tutorials/:id" element={<TutorialPlayerPage />} />
              <Route path="songs" element={<SongsPage />} />
              <Route path="songs/:id" element={<SongDetail />} />
              <Route path="community" element={<CommunityPage />} />
              <Route path="challenges" element={<ChallengesPage />} />
              <Route path="events" element={<EventsPage />} />
              <Route path="achievements" element={<AchievementsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="faq" element={<FAQPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="auth" element={<AuthPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;