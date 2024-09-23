import { createSlice } from '@reduxjs/toolkit';


// export type TUser = {
//   email: string;
//   role: string;
//   iat: number;
//   exp: number;
// };

type TAuthState = {
  user: null | any;
  token: null | string;
  countdown: null | any;
};

const initialState: TAuthState = {
  user: null,
  token: null,
  countdown:null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    countdown: (state) => {
      state
    }
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
