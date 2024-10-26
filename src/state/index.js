import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
    },
    updateUserRole: (state, action) => {
      if (state.user) {
        state.user.role = action.payload.role;
      }
    }
  },
});

export const { setLogin, setLogout, updateUserRole } = authSlice.actions;
export default authSlice.reducer;
