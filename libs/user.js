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

export const saveAddress = async (address, userId) => {
  try {
    const { data } = await axios.post('/api/user/saveAddress', {
      address, userId
    });
    return data;
  } catch (error) {
    return console.log(error);
  }
};

export const deleteAddress = async (id) => {
  try {
    const { data } = await axios.delete("/api/user/manageAddress", {
      data: { id },
    });
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};