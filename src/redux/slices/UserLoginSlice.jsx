import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import JSEncrypt from "jsencrypt";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ userName, password, publicKey }, { rejectWithValue }) => {
    try {
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(publicKey);
      const encryptedPassword = encrypt.encrypt(password);
      if (!encryptedPassword) return rejectWithValue("Encryption failed.");
      const loginRes = await fetch(
        "http://localhost:8080/effort/service/get/webliteLogin",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, password }),
        }
      );

      if (!loginRes.ok) return rejectWithValue("Invalid credentials.");

      const userDetailsRes = await fetch(
        "http://localhost:8080/effort/reactrest/api/home",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!userDetailsRes.ok)
        return rejectWithValue("Failed to fetch user details.");

      const userDetails = await userDetailsRes.json();
      return userDetails;
    } catch (error) {
      return rejectWithValue("Something went wrong: " + error.message);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    userName: "",
    password: "",
    userDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLoginData: (state, action) => {
      state.userName = action.payload.userName;
      state.password = action.payload.password;
    },
    clearLoginData: (state) => {
      state.userName = "";
      state.password = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoginData, clearLoginData } = loginSlice.actions;
export default loginSlice.reducer;
