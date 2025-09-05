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

      const response = await axios.post('http://localhost:5161/api/auth/googleLogin', userToSave);
      if (response.data.message === "Login successfully") {
        toast.success("Login successfully", {
          position: "top-right",
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('User saved:', response.data);
      }
      else if (response.data.message == 'Email already exists') {
      //   toast.error("Already Have Account", {
      //     position: "top-right",
      //     autoClose: 900,
      //     hideProgressBar: false,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     closeOnClick: true,
      //   });
      //   console.log(response.data);
        
      // }
      // setUserProp({
      //   userName: userToSave.name,
      //   email: userToSave.email,
      //   sub: userToSave.google_id,
      //   picture: userToSave.picture,
      // });

      // axios  
      //     .post("http://localhost:7100/api/Google_login", userToSave)
      //     .then((response) => {
      //         login(response.data.user, response.data.token);
      //     })
      //     .catch((error) => {
      //         console.error("Error saving user:", error);
      //     });


          toast.success("Login successfully", {
                position: "top-right",
                autoClose: 900,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
          });

          login(response.data.user, response.data.token1);
          console.log('User saved:', response.data);

          console.log(response.data);
          navigate('/');
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