import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    otherUsers : null ,
    userProfile: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOtherUsers :(state , action) =>{
      state.otherUsers = action.payload
    },
    setUserProfile : (state , action)=>{
      state.userProfile = action.payload
  }
  },
});

export const { setUser , setOtherUsers , setUserProfile} = userSlice.actions;
export default userSlice.reducer;
