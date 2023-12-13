import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };


  export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
      try {
        const res = await axios.post("/api/users/register", userData);
  
        if (res.data) {
          const userData = {
            ...res.data,
          };
          sessionStorage.setItem("user", JSON.stringify(userData));
        }
        return res.data;
      } catch (err) {
        var msg;
        if (err.response.status === 400) msg = err.response.data.error;
        else
          msg =
            (err.response && err.response.data && err.response.data.error) ||
            err.message ||
            err.toString();
        return thunkAPI.rejectWithValue(msg);
      }
    }
  );
  export const logout = createAsyncThunk("auth/logout", async () => {
    await axios.get("/api/logout");
  
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("voted");
  
    return null;
  });
  export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/login", user);
      if (response.status === 200) {
        const userData = {
          ...response.data,
        };
        sessionStorage.setItem("user", JSON.stringify(userData));
        return userData;
      }
    } catch (err) {
      var msg;
      if (err.response.status === 401 || err.response.status === 400)
        msg = err.response.data.error;
      else
        msg =
          (err.response && err.response.data && err.response.data.error) ||
          err.message ||
          err.toString();
      return thunkAPI.rejectWithValue(msg);
    }
  });
  export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(login.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
          state.isError = true;
          state.isLoading = false;
          state.message = action.payload;
          state.user = null;
        })
        .addCase(logout.fulfilled, (state, action) => {
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.isError = true;
          state.isLoading = false;
          state.message = action.payload;
          state.user = null;
        });
    },
  });
  export const { reset } = authSlice.actions;
  export const authReducer = authSlice.reducer;