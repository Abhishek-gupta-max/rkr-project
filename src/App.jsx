import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppProvider>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </AppProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
