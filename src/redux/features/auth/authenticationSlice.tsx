import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface AuthValues {
  name?: string | null;
  email: string;
  password: string;
  isReg: boolean;
  error?: string;
}

const initialState: AuthValues = {
  name: '',
  email: '',
  password: '',
  isReg: false,
  error: '',
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
    setError: (state: AuthValues, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setUserName: (state: AuthValues, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { updateAuthValue, changeAuthenticationForm, setError, setUserName } =
  authSlice.actions;
export const selectAuthValues = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;
