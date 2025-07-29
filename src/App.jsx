import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, AppContext } from './src/context/AppContext';

// Common Components
import Layout from './src/components/common/Layout';


// Pages
import Dashboard from './src/components/dashboard/Dashboard';
import AuthPage from './src/components/auth/AuthPage';
import ClientDashboard from './src/components/clients/ClientDashboard';
import FormSection from './src/components/forms/FormSection';
import InvoiceCreation from './src/components/invoice/InvoiceCreation';
import ChartsSection from './src/components/charts/ChartsSection';

import './src/App.css';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);
  return user ? children : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Authentication Route */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/clients" element={<ClientDashboard />} />
                    <Route path="/forms" element={<FormSection />} />
                    <Route path="/invoices" element={<InvoiceCreation />} />
                    <Route path="/charts" element={<ChartsSection />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
