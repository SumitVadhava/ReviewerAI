import { useGoogleOneTapLogin } from '@react-oauth/google'
import { useState } from 'react';
import { decodeJwt } from 'jose';
import axios  from 'axios';
import {toast} from 'react-toastify';
import { useAuth } from './../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const GoogleOneTapLogin = () => {
  // const { user, token } = useAuth();
  // const isLoggedIn = !!user && !!token;
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();


  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      // if (isLoggedIn) return;

      const payload = decodeJwt(credentialResponse.credential);

      const userToSave = {
        Username: payload.name,
        Email: payload.email,
        PictureUrl: payload.picture,
        GoogleId: payload.sub,
      };

      //  console.log("User Info:", userToSave);

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/googleLogin`, userToSave);
      if (response.data.message === "Login successfully" || response.data.message === "Email already exists") {
        toast.success("Login successfully", {
          position: "top-right",
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        const token = response.data.token || response.data.token1 || response.data.token;
        login(response.data.user, token);
        
        console.log('User logged in via One Tap:', response.data);
        navigate('/overview');
      }
    },
    onError: () => {
      toast.error("Google login failed", {
        position: "top-right",
        autoClose: 900,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeOnClick: true,
      });
      console.log("Google OneTap Login Failed");
    },
    disableCancelOnTapOutside: false
  });
  return null;
};


export default GoogleOneTapLogin