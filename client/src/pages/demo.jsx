const handleSubmit = async () => {
    if (validateForm()) {
      try {
        if (isLoginMode) {
          // Login API call
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
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
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
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
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, {
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
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

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