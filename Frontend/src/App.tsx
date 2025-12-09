import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { HeroDetails } from './pages/HeroDetails';
import { AddHero } from './pages/AddHero';
import { EditHero } from './pages/EditHero';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/hero/:id" element={<HeroDetails />} />
            <Route
                path="/add-hero"
                element={
                  <ProtectedRoute>
                    <AddHero />
                  </ProtectedRoute>
                }
            />
            <Route
                path="/edit-hero/:id"
                element={
                  <ProtectedRoute>
                    <EditHero />
                  </ProtectedRoute>
                }
            />
            <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminPage />
                  </ProtectedRoute>
                }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;