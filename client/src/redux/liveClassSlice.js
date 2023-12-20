import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const liveClass = JSON.parse(sessionStorage.getItem("liveClass"));
const initialState = {
    liveClass: liveClass ? liveClass : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };


  export const postLiveclassData= createAsyncThunk(
    "auth/register",
    async (liveClassData, thunkAPI) => {
      try {
        console.log(liveClassData)
        // const res = await axios.post(`/api/v1/liveclass/${user}`, liveClassData);
  
        // if (res.data) {
        //   const liveClassData = {
        //     ...res.data,
        //   };
        //   sessionStorage.setItem("user", JSON.stringify(liveClassData));
        // }
        // return res.data;
      } catch (err) {
        // var msg;
        // if (err.response.status === 400) msg = err.response.data.error;
        // else
        //   msg =
        //     (err.response && err.response.data && err.response.data.error) ||
        //     err.message ||
        //     err.toString();
        // return thunkAPI.rejectWithValue(msg);
      }
    }
  );
 
  export const getLiveClassData = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
      const response = await axios.get("/api/v1/auth/login");
      console.log(response)
      if (response.status === 201) {
        const userData = {
          ...response.data,
        };
        sessionStorage.setItem("liveClass", JSON.stringify(userData));
        return userData;
      }
    } catch (err) {
     console.log(err.message);
    }
  });
  export const liveClassSlice = createSlice({
    name: "liveClass",
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
        .addCase(postLiveclassData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getLiveClassData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(postLiveclassData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(getLiveClassData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
        })
        .addCase(postLiveclassData.rejected, (state, action) => {
          state.isError = true;
          state.isLoading = false;
          state.message = action.payload;
          state.user = null;
        })
       
        .addCase(getLiveClassData.rejected, (state, action) => {
          state.isError = true;
          state.isLoading = false;
          state.message = action.payload;
          state.user = null;
        });
    },
  });
  export const { reset } = liveClassSlice.actions;
  export const liveClassReducer = liveClassSlice.reducer;