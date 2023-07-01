import { createSlice } from "@reduxjs/toolkit";

interface AppSlice {
  isLoading: boolean;
}

const initialState: AppSlice = {
  isLoading: false,
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = appSlice.actions;
export default appSlice.reducer;
