import React from 'react'
import { useAuth } from '../context/AuthContext';
import Avatar from './Avatar';
import logo from './../assets/logo.png';
import UserLoginButton from './UserLoginButton';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userData }) => {
    const {isAuthenticated, loading} = useAuth();
    const navigate = useNavigate();

    // meet
    if(loading) return null;

  return (
   <nav className='max-w-7xl mx-auto flex flex-row justify-between items-center'>
          <div className='cursor-pointer' onClick={() => navigate('/')}>
            <img src={logo} alt="" className='w-40' />
          </div>
          {/* meet */}
          {!isAuthenticated() ? 
            <UserLoginButton/>
            : 
            <Avatar userData={userData} />
          }
    </nav>
  )
}

export default Navbar