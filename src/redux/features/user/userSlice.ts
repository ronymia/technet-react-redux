import { auth } from '@/lib/firebase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

interface IUser {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

const initialState: IUser = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};

interface ICredentialUser {
  email: string;
  password: string;
}

export const createUserAsyncThunk = createAsyncThunk(
  'user/createUser',
  async ({ email, password }: ICredentialUser) => {
    const user = await createUserWithEmailAndPassword(auth, email, password);

    return user.user.email;
  }
);

export const loginUserAsyncThunk = createAsyncThunk(
  'user/login',
  async ({ email, password }: ICredentialUser) => {
    const data = await signInWithEmailAndPassword(auth, email, password);

    return data.user.email;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user.email = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Sign Up User
    builder
      .addCase(createUserAsyncThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createUserAsyncThunk.fulfilled,
        (state, action: PayloadAction<string | null>) => {
          state.isLoading = false;
          state.user.email = action.payload;
        }
      )
      .addCase(createUserAsyncThunk.rejected, (state, action) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      }),
      // Login User
      builder
        .addCase(loginUserAsyncThunk.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(loginUserAsyncThunk.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user.email = action.payload;
        })
        .addCase(loginUserAsyncThunk.rejected, (state, action) => {
          state.user.email = null;
          state.isLoading = false;
          state.isError = true;
          state.error = action.error.message!;
        });
  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
