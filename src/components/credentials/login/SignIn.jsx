import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTextfield from "../../common/ReusableTextfield";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignIn = ({onLogin}) => {
  const navigate = useNavigate();
  const [isRegisterClick, setRegisterClick] = useState(false);
  const [isLoginClick, setIsLoginClick] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      alert("Please enter email and password.");
      return;
    }


    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === loginData.email && storedUser.password === loginData.password) {
        onLogin();
      navigate("/home"); 
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerData.email || !registerData.password || !registerData.confirmPassword) {
      alert("Please fill all fields.");
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

   localStorage.setItem('isAuthenticated',true)

    localStorage.setItem("user", JSON.stringify({ email: registerData.email, password: registerData.password }));

    alert("Registration successful! You can now log in.");
    setIsLoginClick(true);
    setRegisterClick(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {isLoginClick && (
        <Stack component="form" onSubmit={handleLoginSubmit} sx={{ gap: 2, border: "1px solid gray", py: 5, px: { sm: 5, xs: 3 }, borderRadius: "5px" }}>
          <Stack>
            <Typography>Email</Typography>
            <ReusableTextfield placeholder="Enter email" name="email" value={loginData.email} onChange={handleLoginChange} />
          </Stack>
          <Stack>
            <Typography>Password</Typography>
            <ReusableTextfield
              placeholder="Enter password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={loginData.password}
              onChange={handleLoginChange}
              icon={
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
            />
          </Stack>
          <Button type="submit" variant="outlined">
            Login
          </Button>
          <Typography sx={{ fontSize: "10px" }}>
            Don't have an account?{" "}
            <Typography
              component={"span"}
              sx={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                setIsLoginClick(false);
                setRegisterClick(true);
              }}
            >
              Register here
            </Typography>
          </Typography>
        </Stack>
      )}

      {isRegisterClick && (
        <Stack component="form" onSubmit={handleRegisterSubmit} sx={{ gap: 2, border: "1px solid gray", py: { xs: 2, sm: 2, md: 3 }, px: { sm: 5, xs: 3 }, borderRadius: "5px" }}>
          <Stack>
            <Typography>First Name</Typography>
            <ReusableTextfield placeholder="Enter first name" name="firstName" value={registerData.firstName} onChange={handleRegisterChange} />
          </Stack>
          <Stack>
            <Typography>Last Name</Typography>
            <ReusableTextfield placeholder="Enter last name" name="lastName" value={registerData.lastName} onChange={handleRegisterChange} />
          </Stack>
          <Stack>
            <Typography>Email</Typography>
            <ReusableTextfield placeholder="Enter email" name="email" value={registerData.email} onChange={handleRegisterChange} />
          </Stack>
          <Stack>
            <Typography>Password</Typography>
            <ReusableTextfield
              placeholder="Enter password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={registerData.password}
              onChange={handleRegisterChange}
              icon={
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
            />
          </Stack>
          <Stack>
            <Typography>Confirm Password</Typography>
            <ReusableTextfield
              placeholder="Confirm password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              icon={
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
            />
          </Stack>
          <Button type="submit" variant="outlined">
            Register
          </Button>
          <Typography sx={{ fontSize: "10px" }}>
            Already have an account?{" "}
            <Typography
              component={"span"}
              sx={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                setIsLoginClick(true);
                setRegisterClick(false);
              }}
            >
              Login here
            </Typography>
          </Typography>
        </Stack>
      )}
    </Box>
  );
};

export default SignIn;
