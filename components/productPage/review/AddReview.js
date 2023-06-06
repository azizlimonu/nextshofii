import styles from './review.module.scss';

import React, { useState } from 'react';
import { Rating } from "@mui/material";
import Select from './Select';
import Images from './Images';
import { useDispatch } from 'react-redux';
import { uploadImages } from '../../../libs/upload';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import DialogModal from '../../dialogmodal';
import DotLoaders from '../../loaders/DotLoaders';
import dataURItoBlob from '../../../utils/dataURItoBlob';
import { hideDialog, showDialog } from "../../../store/dialogSlice";

const AddReview = ({ product, setReviews }) => {
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("");
  const [style, setStyle] = useState("");
  const [fit, setFit] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [images, setImages] = useState([]);

  let fits = ["Small", "True to size", "Large"];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hideDialog());
  }, []);

  let uploaded_images = [];
  const handleSubmit = async () => {
    try {
      setLoading(true);
      let messages = [];
      if (!size) {
        messages.push({
          msg: "Please select a size !",
          type: "error",
        });
        return;
      }
      if (!style) {
        messages.push({
          msg: "Please select a style !",
          type: "error",
        });
        return;
      }
      if (!fit) {
        messages.push({
          msg: "Please select a fit !",
          type: "error",
        });
        return;
      }
      if (!review) {
        messages.push({
          msg: "Please add a review !",
          type: "error",
        });
        return;
      }
      if (!rating) {
        messages.push({
          msg: "Please select a rating !",
          type: "error",
        });
        return;
      }

      if (messages.length > 0) {
        dispatch(
          showDialog({
            header: "Adding review error !",
            messages,
          })
        );
      } else if (images.length > 0) {
        const imagePromises = images.map(async (img) => {
          let blob = dataURItoBlob(img);
          let formData = new FormData();

          formData.append("path", "reviews images");
          formData.append("file", blob);

          const data = await uploadImages(formData);
          return data;
        });
        uploaded_images = (await Promise.all(imagePromises)).flat(Infinity);
      }
      const { data } = await axios.put(`/api/product/${product._id}/reviews`, {
        size,
        style,
        fit,
        rating,
        review,
        images: uploaded_images,
      });

      setReviews(data.reviews);
      setStyle("");
      setSize("");
      setFit("");
      setImages([]);
      setRating(0);
      setReview("");

      toast.success("REVIEW SUBMITTED");
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={styles.reviews__add}>
      {loading && <DotLoaders loading={loading} />}
      <DialogModal />
      <div className={styles.reviews__add_wrap}>
        <div className={styles.flex} style={{ gap: "10px" }}>
          <Select
            property={size}
            text="Size"
            data={product.allSizes.filter((x) => x.size !== size)}
            handleChange={setSize}
          />

          <Select
            property={style}
            text="Style"
            data={product.colors.filter((x) => x !== style)}
            handleChange={setStyle}
          />

          <Select
            property={fit}
            text="How does it fit"
            data={fits.filter((x) => x !== fit)}
            handleChange={setFit}
          />

        </div>

        <Images images={images} setImages={setImages} />

        <textarea
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here"
        />

        <Rating
          name="half-rating-read"
          defaultValue={0}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          precision={0.5}
          style={{ color: "#facf19", fontSize: "3rem" }}
        />

        <button
          className={`
          ${styles.login_btn} 
          ${loading
              ? styles.disabled
              : ""
            }`}
          onClick={() => handleSubmit()}
          disabled={loading}
        >
          Submit Review{" "}
          {loading && <p>Loading...</p>}
        </button>

      </div>
    </div>
  )
}

export default AddReview;