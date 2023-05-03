import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface AuthValues {
  name?: string;
  email: string;
  password: string;
  isReg: boolean;
}

const initialState: AuthValues = {
  name: '',
  email: '',
  password: '',
  isReg: false,
};

interface UpdateAuthValuesPayload {
  key: keyof AuthValues;
  value: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuthValue: (state: AuthValues, action: PayloadAction<UpdateAuthValuesPayload>) => {
      const { key, value } = action.payload;
      state[key] = value as never;
    },
    changeAuthenticationForm: (state: AuthValues) => {
      state.isReg = !state.isReg;
    },
  },
});

export const { updateAuthValue, changeAuthenticationForm } = authSlice.actions;
export const selectAuthValues = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;
