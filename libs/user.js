import axios from "axios";

export const saveCart = async (cart) => {
  try {
    const { data } = await axios.post("/api/user/saveCart", {
      cart,
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const saveAddress = async (address) => {
  try {
    const { data } = await axios.post('/api/user/saveAddress', {
      address
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const changeActiveAddress = async (id) => {
  try {
    const { data } = await axios.put("/api/user/manageAddress", {
      id,
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteAddress = async (id) => {
  console.log("ID REQUEST", id);
  try {
    // const { data } = await axios.delete("/api/user/manageAddress", {
    //   data: { id },
    // });
    const { data } = await axios.delete(`/api/user/address/${id}`)
    console.log("DATA REQUEST", data);
    return data;
  } catch (error) {
    return error;
  }
};

export const applyCoupon = async (coupon) => {
  try {
    const { data } = await axios.post('/api/user/applyCoupon', {
      coupon
    });
    return { ...data, success: true }
  } catch (error) {
    return { error, success: false }
  }
}
