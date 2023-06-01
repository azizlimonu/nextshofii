import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  header: "",
  messages: [],
  link: {
    link: "",
    link_text: "",
  },
};

export const DialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    showDialog(state, action) {
      state.show = true;
      state.header = action.payload.header;
      state.messages = action.payload.messages;
      state.link = action.payload.link;
    },
    hideDialog(state, action) {
      state.show = false;
      state.header = "";
      state.messages = [];
      state.link = {};
    },
  },
});

export const { showDialog, hideDialog } = DialogSlice.actions;

export default DialogSlice.reducer;