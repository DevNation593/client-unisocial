import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserProfile, UsersState } from '../../types/user.types';
import api from '../../utils/api';

const initialState: UsersState = {
  profiles: [],
  loading: false,
  error: null
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await api.get('/users');
    return response.data;
  }
);

export const fetchUserProfile = createAsyncThunk(
  'users/fetchUserProfile',
  async (userId: string) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.profiles = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  }
});

export default usersSlice.reducer;