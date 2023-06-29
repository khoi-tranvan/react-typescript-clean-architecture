import { createSlice } from "@reduxjs/toolkit";

interface AuthenSlice {
  user: any;
  isSignedIn: boolean;
}

const initialState: AuthenSlice = {
  user: null,
  isSignedIn: false,
};

export const userSlice = createSlice({
  name: "authenSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
