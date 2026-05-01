import React, { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import logo from '../src/assets/logo_4.png'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Overview from './pages/Overview'
import UserLoginButton from './components/UserLoginButton'
import AuthForm from './pages/AuthForm'
import UploadFile from './pages/UploadFile'
import ProFile from './pages/ProfilePage'
import Review from './pages/re2'
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar'
import { useAuth } from './context/AuthContext'
import OnlineCompiler from './pages/onlineCompiler'
import ProtectedRoute from './components/ProtectedRoute'
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import GradientButton from './components/GradientButton'

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const { isAuthenticated, user, loading } = useAuth();
  const [userProp, setUserProp] = useState({
    userName: "",
    email: "",
    sub: "",
    picture: "",
  });
  // const [showGoogleOneTap, setShowGoogleOneTap] = useState(true);

  // useEffect(() => {
  //   setShowGoogleOneTap(true)
  // }, [])

  useEffect(() => {
    if (isAuthenticated()) {
      setUserProp({
        userName: user.username !== null ? user.username : "", // Add fallback to user.name
        email: user.email,
        sub: user.id || "", // Add user ID
        picture: user.pictureUrl || "", // Add default picture
      });
    }
  }, [isAuthenticated, user]);

  return (
    <>
      <div className='bg-[#00020b] min-h-screen'>
        {(currentPath !== '/upload' && currentPath !== '/review' && currentPath !== '/onlineCompiler') && <Navbar userData={userProp} />}
        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/overview' element={<ProtectedRoute><Overview /></ProtectedRoute>} />
            <Route path='/auth' element={<AuthForm userData={userProp} setUserData={setUserProp} />} />
            <Route path='/upload' element={<ProtectedRoute><UploadFile userData={userProp} setUserData={setUserProp}/></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><ProFile userData={userProp} setUserData={setUserProp} /></ProtectedRoute>} />
            <Route path='/review' element={<ProtectedRoute><Review /></ProtectedRoute>} />
            <Route path='/onlineCompiler' element={<ProtectedRoute><OnlineCompiler /></ProtectedRoute>}/>
          </Routes>
        </main>
      </div>
      <ToastContainer position="top-right" reverseOrder={false} />
    </>
  )
}

export default App