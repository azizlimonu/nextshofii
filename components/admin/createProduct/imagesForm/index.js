import { ErrorMessage, useField } from 'formik';
import React, { useRef } from 'react';
import { RiDeleteBin7Fill, RiShape2Line } from 'react-icons/ri';
import { GiExtractionOrb } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { showDialog } from '../../../../store/dialogSlice';

const ImagesForm = ({
  name,
  header,
  text,
  images,
  setImages,
  setColorImage,
  ...props
}) => {

  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const [meta, field] = useField({ ...props, name: name });

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((img, i) => {
      // validate image file length max 6
      if (i == 5 || images.length == 6) {
        dispatch(
          showDialog({
            header: "Max 6 images are allowed.",
            messages: [
              {
                msg: `Maximum of total six images are allowed.`,
                type: "error",
              },
            ],
          })
        );
        // validate files type
      } else if (
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
        files = files.filter((item) => item !== img.name);
        return;
        // validate images file size
      } else if (img.size > 1024 * 1024 * 2) {
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
          setImages((images) => [...images, e.target.result]);
        };
      }
    });
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
          {header}
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
        name={name}
        ref={fileInput}
        hidden
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImages}
      />

      <div className={`${styles.images__main} ${images.length === 0 && styles.images__noImages}`}>
        <div
          className={`${styles.images__main_grid} ${images.length == 2
              ? styles.grid__two
              : images.length == 3
                ? styles.grid__three
                : images.length == 4
                  ? styles.grid__four
                  : images.length == 5
                    ? styles.grid__five
                    : images.length == 6
                      ? styles.grid__six
                      : ""
            }`}
        >
          {!images.length ? (
            <img
              style={{ width: "auto", height: "300px", objectFit: "fill" }}
              src="../../../images/no_image.png"
              alt=""
            />
          ) : (
            images?.map((img, i) => (
              <div className={styles.images__main_grid_wrap} key={i}>
                <div className={styles.blur}></div>

                <img src={img} alt="" />

                <div className={styles.images__main_grid_actions}>
                  <button type='button' onClick={() => handleRemove(img)}>
                    <RiDeleteBin7Fill />
                  </button>

                  <button type='button' onClick={() => setColorImage(img)}>
                    <GiExtractionOrb />
                  </button>

                  <button>
                    <RiShape2Line type='button' />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <button
        type="reset"
        disabled={images.length == 6}
        style={{ opacity: `${images.length == 6 && "0.5"}` }}
        onClick={() => fileInput.current.click()}
        className={`${styles.btn} ${styles.btn__primary}`}
      >
        {text}
      </button>
    </div>
  )
}

export default ImagesForm;