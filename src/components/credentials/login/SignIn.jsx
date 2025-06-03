import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReusableTextfield from "../../common/ReusableTextfield";
const SignIn = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [isRegisterClick, setRegisterClick] = useState(false);
  const [isLoginClick, setIsLoginClick] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userDetails, setuserDetails] = useState({});
  const publicKey =
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOgiuu/2ainlWvBleyQlkPmm4F7ZCG397xEmgSAYghvJSNQgyAit3kw6+DwK82svLgAOOwpYBp/V3rZUkGiMvcpP05v7cRAKMJeUaA6z8n3OpMJ3cNmuLZvVUCLL9GQgjsqoK+GIWQVcgsGXbR/nI0c94AKrnfDqmK5ck/x+gphQIDAQAB";

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.userName || !loginData.password) {
      alert("Please enter email and password.");
      return;
    }

    // const encrypt = new JSEncrypt();
    // encrypt.setPublicKey(publicKey);

    // const encryptedPassword = encrypt.encrypt(loginData.password);
    // if (!encryptedPassword) {
    //   alert("Encryption failed.");
    //   return;
    // }

    try {
      const loginResponse = await fetch(
      //  "https://vapt.spoors.dev/webliteBackend/service/get/webliteLogin",
      "http://localhost:8080/effort/service/get/webliteLogin",
        {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: loginData.userName,
            password: loginData.password,
          }),
        }
      );

      if (!loginResponse.ok) {
        alert("Login failed. Please check credentials.");
        return;
      } else {
        handleLogin();
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      alert("Please fill all fields.");
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: registerData.userName,
        password: registerData.password,
      })
    );

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
        <Stack
          component="form"
          onSubmit={handleLoginSubmit}
          sx={{
            gap: 2,
            border: "1px solid gray",
            py: 5,
            px: { sm: 5, xs: 3 },
            borderRadius: "5px",
          }}
        >
          {userDetails && userDetails.isSignOutFrom}
          <Stack>
            <Typography>name</Typography>
            <ReusableTextfield
              placeholder="Enter name"
              name="userName"
              value={loginData.userName}
              onChange={handleLoginChange}
            />
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
              sx={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
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
        <Stack
          component="form"
          onSubmit={handleRegisterSubmit}
          sx={{
            gap: 2,
            border: "1px solid gray",
            py: { xs: 2, sm: 2, md: 3 },
            px: { sm: 5, xs: 3 },
            borderRadius: "5px",
          }}
        >
          <Stack>
            <Typography>First Name</Typography>
            <ReusableTextfield
              placeholder="Enter first name"
              name="firstName"
              value={registerData.firstName}
              onChange={handleRegisterChange}
            />
          </Stack>
          <Stack>
            <Typography>Last Name</Typography>
            <ReusableTextfield
              placeholder="Enter last name"
              name="lastName"
              value={registerData.lastName}
              onChange={handleRegisterChange}
            />
          </Stack>
          <Stack>
            <Typography>Email</Typography>
            <ReusableTextfield
              placeholder="Enter email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
            />
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
                <IconButton
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
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
              sx={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
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
