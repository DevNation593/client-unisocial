import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
  variant: 'default' | 'destructive' | null;
  message: string | null;
  timeout?: number;
}

const initialState: AlertState = {
  variant: null,
  message: null,
  timeout: 5000
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<Omit<AlertState, 'timeout'>>) => {
      state.variant = action.payload.variant;
      state.message = action.payload.message;
    },
    clearAlert: (state) => {
      state.variant = null;
      state.message = null;
    },
    setAlertTimeout: (state, action: PayloadAction<number>) => {
      state.timeout = action.payload;
    }
  }
});

export const { showAlert, clearAlert, setAlertTimeout } = alertSlice.actions;
export default alertSlice.reducer;

export const selectAlert = (state: { alert: AlertState }) => state.alert;