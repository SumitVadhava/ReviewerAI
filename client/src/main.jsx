import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AuthProvider from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Re from './pages/re.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="1074554542649-2492tgmnlhscdeq8uto7blg9ju1iqfvl.apps.googleusercontent.com">
        <AuthProvider>
        <App/>
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)