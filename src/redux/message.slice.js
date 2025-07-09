import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    receiver: null,
    messages: null
  },
  reducers: {
    setReceiver: (state, action) => {
      state.receiver = action.payload;
    },
    setMessages: (state, action) => {
        state.messages = action.payload;
      },
  },
});

export const { setReceiver , setMessages} = messageSlice.actions;
export default messageSlice.reducer;
