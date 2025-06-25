import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { globalstyle } from "../../styles/GlobalCss";
const ChangePassword = () => {
  const requirements = [
    "Password should be at least seven alphanumeric characters",
    "Must contain at least one uppercase letter (A-Z)",
    "Must contain at least one lowercase letter (a-z)",
    "Must contain at least one special character from @#$^&+",
    "Must be different from previous four passwords",
  ];
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Box sx={{ mt: 9 }}>
      <Stack sx={{ flexDirection: { sm: "row", xs: "column" }, gap: 1 ,marginTop:'20px' }}>
        <Stack sx={{ gap: 1, width: { sm: "50%", xs: "100%" }, p: 0.5 }}>
          <TextField
            placeholder="Enter old password"
            type={showPassword.old ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => togglePasswordVisibility("old")}>
                    {showPassword.old ? (
                      <VisibilityOffIcon
                        sx={{ fontSize: { sm: "24px", xs: "20px" } }}
                      />
                    ) : ( 
                      <VisibilityIcon
                        sx={{ fontSize: { sm: "24px", xs: "20px" } }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={globalstyle.textFieldPassword}
          />

          <TextField
            placeholder="Enter new password"
            type={showPassword.new ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => togglePasswordVisibility("new")}>
                    {showPassword.new ? (
                      <VisibilityOffIcon
                        sx={{ fontSize: { sm: "24px", xs: "20px" } }}
                      />
                    ) : (
                      <VisibilityIcon
                        sx={{ fontSize: { sm: "24px", xs: "20px" } }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={globalstyle.textFieldPassword}
          />

          <TextField
            placeholder="Re-enter password"
            type={showPassword.confirm ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => togglePasswordVisibility("confirm")}
                  >
                    {showPassword.confirm ? (
                      <VisibilityOffIcon
                        sx={{ fontSize: { sm: "24px", xs: "20px" } }}
                      />
                    ) : (
                      <VisibilityIcon
                        sx={{ fontSize: { sm: "24px", xs: "20px" } }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={globalstyle.textFieldPassword}
          />
        </Stack>
        <Stack sx={{ p: 0.3 }}>
          <Typography sx={{ mb: 1, color: "blue" }}>
            Password Requirements:
          </Typography>
          <ul style={{ margin: 0 , fontSize:'12px'}}>
            <li>Password should be at least seven alphanumeric characters</li>
            <li>Must contain at least one uppercase letter (A-Z)</li>
            <li>Must contain at least one lowercase letter (a-z)</li>
            <li>Must contain at least one special character from @#$^&+</li>
            <li>Must be different from previous four passwords</li>
          </ul>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChangePassword;
