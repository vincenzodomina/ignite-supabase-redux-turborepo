import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk } from 'src/store';

export interface AppState {
  healthApiAccessToken?: string;
  healthApiUserId?: string;
};

const initialState: AppState = {
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addHealthApiAccessToken(state: AppState, action: PayloadAction<{ access_token: string }>) {
      const { access_token } = action.payload;
      state.healthApiAccessToken = access_token || undefined;
    },
    addHealthApiUserId(state: AppState, action: PayloadAction<{ user_id: string }>) {
      const { user_id } = action.payload;
      state.healthApiUserId = user_id || undefined;
    },
  }
});

export const reducer = slice.reducer;

export const addHealthApiAccessToken = (access_token: string): AppThunk => async (dispatch) => {
  dispatch(slice.actions.addHealthApiAccessToken({ access_token: access_token }));
};

export const addHealthApiUserId = (user_id: string): AppThunk => async (dispatch) => {
  dispatch(slice.actions.addHealthApiUserId({ user_id: user_id }));
};

export default slice;
