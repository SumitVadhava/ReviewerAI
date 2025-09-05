import React, { useState } from 'react';
import LoginButton from './../components/LoginButton';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ userData, setUserData }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();



  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateUsername = (username) => {
    return username.length >= 3;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLoginMode && !validateUsername(formData.username)) {
      newErrors.username = 'Username must be at least 3 characters long';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleForm = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({ username: '', email: '', password: '' });
    setErrors({});
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // const handleSubmit = () => {
  //   if (validateForm()) {
  //     if (isLoginMode) {
  //       // console.log('Login attempt:', { email: formData.email, password: formData.password });
  //       // alert('Login functionality would be implemented here');


  //     } else {
  //       console.log('Sign up attempt:', formData);
  //       alert('Sign up functionality would be implemented here');
  //     }
  //   }
  // };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        if (isLoginMode) {
          // Login API call
          const response = await axios.post('http://localhost:5161/api/auth/login', {
            email: formData.email,
            password: formData.password
          });

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
            //  return;
            console.log('Login successfully:', response.data);
            // Store token or redirect
            // localStorage.setItem('token', response.data.token);
            // localStorage.setItem('user', JSON.stringify(response.data.user));
            login(response.data.user, response.data.token);

            setUserData({
              userName: response.data.user.username,
              email: response.data.user.email,
              sub: response.data.user._id,
              picture: response.data.user.picture
            })

            navigate('/');
          }
          else if (response.data.message === "Invalid credentials") {
            toast.error("Invalid credentials", {
              position: "top-right",
              autoClose: 900,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // return;
            console.log("Invalid credentials:", response.data.message);
            // Clear form or show specific error
            setFormData({ username: '', email: '', password: '' });
            setErrors({});
          }

          // Assuming response contains token and user
          // console.log('Login successfully:', response.data);
          // Store token or redirect
        } else {
          // Signup API call
          const response = await axios.post('http://localhost:5161/api/auth/signup', {
            username: formData.username,
            email: formData.email,
            password: formData.password
          });

          if (response.data.message === 'Signup successfully') {
            toast.success("Signup successfully", {
              position: "top-right",
              autoClose: 900,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // return;
            console.log('Signup successfully:', response.data);
            // Optionally redirect or show success message
            // localStorage.setItem('token', response.data.token);
            // localStorage.setItem('user', JSON.stringify(response.data.user));
            login(response.data.user, response.data.token);

            navigate('/');

          } else if (response.data.message === "Email already exists") {
            toast.error("Already Have Account!", {
              position: "top-right",
              autoClose: 900,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // return;
            console.log(response.data.message);
            // Clear form or show specific error
            setFormData({ username: '', email: '', password: '' });
            setErrors({});
          }

          // console.log('Signup successfully:', response.data);
          // Optionally auto-login user or show success message
        }
      } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 900,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error('Something went wrong. Please try again.', {
            position: "top-right",
            autoClose: 900,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }
  };

  // Google Login Handler
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log("Google token:", tokenResponse.access_token);

      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const userInfo = res.data;
        // console.log("User Info:", userInfo);

        const userToSave = {
          username: userInfo.name,
          email: userInfo.email,
          pictureUrl: userInfo.picture,
          googleId: userInfo.sub
        };


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
          // localStorage.setItem('token', response.data.token);
          // localStorage.setItem('user', JSON.stringify(response.data.user));
          login(response.data.user, response.data.token);

          setUserData({
            userName: response.data.user.username,
            email: response.data.user.email,
            sub: response.data.user._id,
            picture: response.data.user.pictureUrl
          })

          console.log('User saved:', response.data);

          navigate('/');
          // console.log('token:', response.data.token);
          // console.log('User saved:', response.data.user);
        }

        else if (response.data.message == 'Email already exists') {
          // toast.error("Already Have Account", {
          //   position: "top-right",
          //   autoClose: 900,
          //   hideProgressBar: false,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   closeOnClick: true,
          // });

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
      } catch (error) {
        console.error('Error saving user:', error);
        toast.error("Login failed", {
          position: "top-right",
          autoClose: 900,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };

      // onClose();
    },
    onError: (errorResponse) => {
      toast.error("Google login failed", {
        position: "top-right",
        autoClose: 900,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        closeOnClick: true,
      });
      console.error("Google login error:", errorResponse);
    },
    flow: "implicit",
  });

  const GoogleIcon = () => (
    <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
      <g fill="none" fillRule="evenodd">
        <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
        <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
      </g>
    </svg>
  );

  const EyeIcon = ({ isVisible }) => (
    <svg className="h-5 w-5 text-gray-400 hover:text-blue-400 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {isVisible ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
      ) : (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </>
      )}
    </svg>
  );

  return (
    <div className=" flex items-center justify-center p-4" style={{ backgroundColor: '#00020b' }}>
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-10 w-full max-w-md shadow-2xl relative overflow-hidden hover:bg-white/8 transition-all duration-300 hover:shadow-3xl ">
        {/* Top border gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400"></div>

        {/* Animated background gradient 
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-400/5 opacity-50"></div>*/}
        <div className="absolute inset-0 bg-[#0d0d0d] opacity-50"></div>


        {/* Form Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-8 relative z-10">
          {isLoginMode ? 'Welcome Back  👋' : 'Create Account '}
        </h2>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-white/20 rounded-lg text-white font-medium hover:border-white/40 hover:bg-white/10 transition-all duration-300 mb-6 backdrop-blur-sm relative z-10 hover:scale-105 hover:shadow-lg"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="relative text-center mb-6 z-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-24 border-t border-white/20"></div>
          </div>
          <div className="relative px-4" style={{}}>
            <span className="text-sm text-gray-300 uppercase tracking-wide">
              {isLoginMode ? 'or login with email' : 'or sign up with email'}
            </span>

          </div>
          <div className="absolute justify-end inset-0 flex items-center">
            <div className="w-24 border-t border-white/20"></div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5 relative z-10">
          {/* Username Field (Only visible in sign up mode) */}
          {!isLoginMode && (
            <div className="animate-fadeIn">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-200 mb-2">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your Username"
                  className={`w-full pl-10 pr-4 py-3 border-2 ${errors.username ? 'border-red-400' : 'border-white/20'} rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 hover:bg-white/8 hover:border-white/30`}
                />
              </div>
              {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-2">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your Email"
                className={`w-full pl-10 pr-4 py-3 border-2 ${errors.email ? 'border-red-400' : 'border-white/20'} rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400   transition-all duration-300  hover:border-white/30`}
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your Password"
                className={`w-full pl-10 pr-12 py-3 border-2 ${errors.password ? 'border-red-400' : 'border-white/20'} rounded-lg bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 hover:bg-white/8 hover:border-white/30`}
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center hover:scale-110 transition-transform duration-200"
              >
                <EyeIcon isVisible={showPassword} />
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button 
          <button 
            type="button"
            onClick={handleSubmit}
            className="w-full  text-white py-3.5 px-4 rounded-lg font-semibold ring-1 ring-blue-400/50 hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-400/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:scale-105 mb-6 backdrop-blur-sm"
          >
            {isLoginMode ? 'Login' : 'Sign Up'}
          </button>   */}
          <LoginButton login={isLoginMode} onClick={handleSubmit} />

        </div>

        {/* Toggle Link */}
        <p className="text-center py-2 text-sm text-gray-300 relative z-10">
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={toggleForm}
            className="text-blue-400 font-semibold hover:text-cyan-400 hover:underline transition-all duration-300 hover:scale-105 inline-block"
          >
            {isLoginMode ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default AuthForm;