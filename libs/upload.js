import axios from "axios";

export const uploadImages = async (formData) => {
  const { data } = await axios.post("/api/cloudinary", formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  console.log("DATA FROM API CLOUDINARY =>", data);
  return data;
};
