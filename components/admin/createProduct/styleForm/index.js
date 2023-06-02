import { ErrorMessage, useField } from 'formik';
import React, { useRef } from 'react';
import { RiDeleteBin7Fill, RiShape2Line } from 'react-icons/ri';
import { GiExtractionOrb } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { showDialog } from '../../../../store/dialogSlice';

const ImagesForm = ({
  product,
  setProduct,
  name,
  colorImage,
  ...props
}) => {

  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const [meta, field] = useField({ ...props, name: name });

  const handleImages = (e) => {
    let img = e.target.files[0];
    if (
      img.type !== "image/jpeg" &&
      img.type !== "image/png" &&
      img.type !== "image/webp"
    ) {
      dispatch(
        showDialog({
          header: "Unsopported Format.",
          messages: [
            {
              msg: `${img.name} format is unsupported ! only JPEG,PNG,WEBP are allowed.`,
              type: "error",
            },
          ],
        })
      );
      return;
    } else if (img.size > 1024 * 1024 * 10) {
      dispatch(
        showDialog({
          header: "Unsopported Format.",
          messages: [
            {
              msg: `${img.name} size is too large, maximum of 2mb allowed.`,
              type: "error",
            },
          ],
        })
      );
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (e) => {
        let colorObject = {
          color: product.color.color,
          image: e.target.result,
        };
        setProduct({
          ...product,
          color: colorObject,
        });
      };
    }
  }

  const handleRemove = (image) => {
    setImages((images) => images.filter((item) => item !== image));
  };

  return (
    <div className={styles.images}>
      <div
        className={`${styles.header} ${meta.error ? styles.header__error : ""}`}
      >
        <div className={styles.flex}>
          {meta.error && <img src="../../../images/warning.png" alt="" />}
          Pick a Product style image
        </div>

        <span>
          {meta.touched && meta.error && (
            <div className={styles.error__msg}>
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>

      <input
        type="file"
        name="colorImageInput"
        ref={fileInput}
        hidden
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImages}
      />

      <button
        type="reset"
        onClick={() => fileInput.current.click()}
        className={`${styles.btn} ${styles.btn__primary}`}
      >
        Pick Style
      </button>
    </div>
  )
}

export default ImagesForm;