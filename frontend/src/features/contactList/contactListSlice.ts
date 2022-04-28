import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Contact } from './contactListAPI';

export interface ContactListState {
  users: Contact[]
  loading: boolean
  error:boolean
}

const initialState: ContactListState = {
  users: [],
  loading: false,
  error: false
};

export const contactListSlice = createSlice({
  name: 'contactListSlice',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUsers: (state, action: PayloadAction<Contact[]>) => {
      state.users = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
  },
});

export const { setUsers, setLoading, setError } = contactListSlice.actions;

export default contactListSlice.reducer;
