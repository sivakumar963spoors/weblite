import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import JSEncrypt from "jsencrypt";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { encrypasswprd, postLogin } from "../../../api/Auth";
import logoImg from "../../../assets/logo.png";
const SignIn = ({ handleLogin, onLogout }) => {
  const navigate = useNavigate();

  const [isLoginClick, setIsLoginClick] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({ userName: "", password: "" });
  const [errorMsg, setErrorMsg] = useState({
    userName: "",
    password: "",
  });
  const [userDetails, setuserDetails] = useState({
    email: "",
    password: "",
  });
  const publicKey =
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDOgiuu/2ainlWvBleyQlkPmm4F7ZCG397xEmgSAYghvJSNQgyAit3kw6+DwK82svLgAOOwpYBp/V3rZUkGiMvcpP05v7cRAKMJeUaA6z8n3OpMJ3cNmuLZvVUCLL9GQgjsqoK+GIWQVcgsGXbR/nI0c94AKrnfDqmK5ck/x+gphQIDAQAB";

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/^\s+/, "");
    setLoginData({ ...loginData, [name]: trimmedValue });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg({ userName: "", password: "" });

    let hasError = false;
    const newErrors = {};

    if (!loginData.userName) {
      newErrors.userName = "Username is required.";
      hasError = true;
    }

    if (!loginData.password) {
      newErrors.password = "Password is required.";
      hasError = true;
    }

    if (hasError) {
      setErrorMsg(newErrors);
      return;
    }

    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);

    const encryptedPassword = encrypt.encrypt(loginData.password);
    if (!encryptedPassword) {
      alert("Encryption failed.");
      return;
    }

    try {
      const loginResponse = await fetch(encrypasswprd, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: loginData.userName,
          password: encryptedPassword,
        }),
      });

      const result = await loginResponse.text(); // or `.json()` if response is JSON

      if (!loginResponse.ok) {
        setErrorMsg({
          userName: "",
          password: "Invalid username or password.",
        });
        return;
      }

      const loginResponse_two = await fetch(postLogin, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: loginData.userName,
          password: result,
        }),
      });

      if (loginResponse_two.status === 401) {
        setErrorMsg({
          userName: "",
          password: "Invalid password.",
        });
        return;
      }

      if (loginResponse_two.status === 403) {
        setErrorMsg({
          userName: "",
          password: "Company is inactive.",
        });
        return;
      }

      if (!loginResponse_two.ok) {
        setErrorMsg({
          userName: "",
          password: "Login failed. Please try again.",
        });
        return;
      }

      handleLogin();
      navigate("/home");
    } catch (error) {
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <Stack
      sx={{
        background:
          "linear-gradient(to bottom,  rgba(255, 255, 255, 1),rgba(24, 151, 219, 1))",
        height: "100vh",
      }}
    >
      <Box>
        <AppBar position="static">
          <Toolbar sx={{ background: "#FFF" }}>
            <Box
              component={"img"}
              src={logoImg}
              sx={{ height: "40px", color: "#FFF" }}
            />
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <>
          {isLoginClick && (
            <Stack
              component="form"
              onSubmit={handleLoginSubmit}
              sx={{
                gap: 2,
                py: 5,
                px: { sm: 5, xs: 2 },
                borderRadius: "5px",
                m: 1,
                boxShadow: "0px 0px 8px 2px rgba(140, 210, 233, 0.63)",
                width: { sm: "40%", xs: "95%" },
              }}
            >
              {userDetails && userDetails.isSignOutFrom}
              <Stack>
                <Typography
                  sx={{
                    my: 3,
                    fontSize: "20px",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  SignIn
                </Typography>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "1px solid blue",
                      },
                      "&:hover fieldset": {
                        border: "1px solid blue",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid blue",
                        boxShadow: "0px 0px 10px 1px rgba(140, 210, 233, 0.63)",
                      },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "12px",
                      textTransform: "capitalize",
                      padding: 2,
                    },
                    "& .MuiInputAdornment-root": {
                      color: "green",
                    },
                  }}
                  placeholder="Enter name"
                  name="userName"
                  value={loginData.userName}
                  onChange={handleLoginChange}
                  label="Email"
                  autoComplete="current-password"
                  error={!!errorMsg.userName}
                  helperText={errorMsg.userName}
                />
              </Stack>
              <Stack>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "1px solid blue",
                      },
                      "&:hover fieldset": {
                        border: "1px solid blue",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid blue",
                        boxShadow: "0px 0px 10px 1px rgba(140, 210, 233, 0.63)",
                      },
                    },
                    "& .MuiInputBase-input": {
                      fontSize: "12px",
                      padding: 2,
                      textTransform: "capitalize",
                    },
                    "& .MuiInputAdornment-root": {
                      color: "green",
                    },
                  }}
                  placeholder="Enter password"
                  label="password"
                  name="password"
                  error={!!errorMsg.password}
                  helperText={errorMsg.password}
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={handleLoginChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              </Stack>
              <Button type="submit" variant="outlined" sx={{ color: "#000" }}>
                Login
              </Button>
              {/* <Typography sx={{ fontSize: "10px" }}>
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
              </Typography> */}
            </Stack>
          )}
        </>
      </Box>

      <Box></Box>
    </Stack>
  );
};

export default SignIn;
