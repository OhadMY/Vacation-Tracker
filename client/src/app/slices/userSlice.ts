import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types";
import { axios } from "../../utils";
import { RootState } from "../store";

type UserState = {
  userData: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  isLoggingOut: boolean;
  wrongCredentials: boolean;
  alreadyExists: boolean;
  accountCreated: boolean;
};

const initialState: UserState = {
  loading: true,
  isLoggedIn: false,
  userData: null,
  isLoggingOut: false,
  wrongCredentials: false,
  alreadyExists: false,
  accountCreated: false,
};

export const register = createAsyncThunk(
  "user/register",
  async ({
    username,
    password,
    firstname,
    lastname,
  }: {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
  }) => {
    const response = await axios.post<User | null>("/users/register", {
      userName: username,
      userPassword: password,
      firstName: firstname,
      lastName: lastname,
    });
    console.log(response.data);
    return response.data;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await axios.post<User | null>("/users/login", {
      userName: username,
      userPassword: password,
    });
    return response.data;
  }
);

export const me = createAsyncThunk("user/me", async () => {
  const response = await axios.get<User | null>("/users/me");
  return response.data;
});

export const logout = createAsyncThunk("user/logout", async () => {
  const response = await axios.post<User | null>("/users/logout");
  return response.data;
});

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.accountCreated = false;
        state.alreadyExists = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload;
          state.isLoggedIn = true;
          state.wrongCredentials = false;
        }
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.wrongCredentials = true;
      });
    builder
      .addCase(me.pending, (state) => {
        state.loading = true;
      })
      .addCase(me.rejected, (state) => {
        state.loading = false;
      })
      .addCase(me.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload;
          state.isLoggedIn = true;
        }
        state.loading = false;
      });
    builder
      .addCase(logout.pending, (state) => {
        state.isLoggingOut = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggingOut = false;
        state.isLoggedIn = false;
        state.userData = null;
      });
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.accountCreated = false;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
        state.alreadyExists = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.alreadyExists = false;
        state.accountCreated = true;
      });
  },
});

export const isAdmin = (state: RootState) => {
  if (!state.user.userData) return false;
  return state.user.userData.userType === 0 ? false : true;
};
