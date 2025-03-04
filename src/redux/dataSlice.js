import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async function to fetch data
export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  return response.json();
});

const dataSlice = createSlice({
  name: 'data',
  initialState: { data: [], loading: false, error: null },
  reducers: {
    addUser: (state, action) => {
      state.data.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.data = state.data.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch data';
      });
  },
});

export const { addUser, deleteUser } = dataSlice.actions;
export default dataSlice.reducer;
