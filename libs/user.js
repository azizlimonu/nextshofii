import axios from "axios";

export const saveCart = async (cart, user_id) => {
  try {
    const { data } = await axios.post("/api/user/saveCart", {
      cart,
      user_id
    });
    // console.log(cart, user_Id);
    return data;
  } catch (error) {
    return error;
  }
};