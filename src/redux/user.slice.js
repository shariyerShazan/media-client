import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    otherUser : null ,
    userProfile: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOtherUser :(state , action) =>{
      state.otherUser = action.payload
    },
    setUserProfile : (state , action)=>{
      state.userProfile = action.payload
  }
  },
});

export const { setUser , setOtherUser , setUserProfile} = userSlice.actions;
export default userSlice.reducer;
