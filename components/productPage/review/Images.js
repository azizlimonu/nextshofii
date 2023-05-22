import React, { useRef, useState } from 'react';
import styles from './review.module.scss';
import { BsFillTrashFill } from "react-icons/bs";

const Images = ({ images, setImages }) => {
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleImages = (e) => {
    // turn object to Array
    let files = Array.from(e.target.files);
    console.log("Files", files);
    files.forEach((image, i) => {
      // validate image length (max 3 images)
      if (images.length == 3 || i == 2) {
        setError("Maximum 3 images are allowed.");
        return;
      }

      // validate image file type
      if (
        image.type !== "image/jpeg" &&
        image.type !== "image/png" &&
        image.type !== "image/webp"
      ) {
        setError(
          `${image.name} format is unsupported ! only JPEG, PNG, WEBP are allowed.`
        );
        files = files.filter((item) => item.name !== image.name);
        return;

        // validate image size max 5mb
      } else if (image.size > 1024 * 1024 * 5) {
        setError(`${img.name} size is too large max 5mb allowed.`);
        files = files.filter((item) => item.name !== image.name);
        return;

      } else {
        setError("");
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
          setImages((images) => [...images, e.target.result]);
        };
      }

    })
  };

  const removeImage = (image) => {
    setImages((images) => images.filter((img) => img !== image));
    if (images.length <= 3) {
      setError("");
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleImages}
        multiple
        accept="image/png,image/jpeg,image/webp"
      />

      <button
        className={styles.login_btn}
        style={{ width: "150px" }}
        onClick={() => inputRef.current.click()}
      >
        Add images
      </button>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.imgs_wrap}>
        {images.length > 0 &&
          images.map((img, i) => (
            <span key={i}>
              <BsFillTrashFill onClick={() => removeImage(img)} />
              <img src={img} alt="" />
            </span>
          ))}
      </div>
    </div>
  )
}

export default Images;