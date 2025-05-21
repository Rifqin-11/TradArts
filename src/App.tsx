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
import SongsPage from './pages/SongsPage';
import SongDetail from './pages/SongDetail';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';

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
              <Route path="songs" element={<SongsPage />} />
              <Route path="songs/:id" element={<SongDetail />} />
              <Route path="community" element={<CommunityPage />} />
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