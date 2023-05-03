import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {},
});


export const { addToCart, updateCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
