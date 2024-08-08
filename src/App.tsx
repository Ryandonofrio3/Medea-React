import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import AuthPage from './pages/AuthPage';
import CredentialsPage from './pages/CredentialsPage';
import ChatPage from './pages/ChatPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/credentials" element={<CredentialsPage />} />
          <Route 
            path="/chat" 
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;