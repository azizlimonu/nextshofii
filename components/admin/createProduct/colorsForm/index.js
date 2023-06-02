import React, { useState } from 'react';
import styles from './styles.module.scss';
import { ErrorMessage, useField } from 'formik';
import { ColorExtractor } from "react-color-extractor";
import { TbArrowUpRightCircle } from "react-icons/tb";

const ColorsForm = ({
  name,
  product,
  setProduct,
  colorImage,
  ...props
}) => {

  const [toggle, setToggle] = useState(false);
  const [colors, setColors] = useState([]);
  const [field, meta] = useField({ name: name, ...props });
  console.log(product);

  return (
    <div className={styles.colors}>
      <div
        className={`${styles.header} ${meta.error
          ? styles.header__error
          : ""
          }`}
      >
        <div className={styles.flex}>
          {meta.error && <img src="../../../images/warning.png" alt="" />}
          Pick a product color
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
        type="text"
        value={product.color.color}
        name={name}
        hidden
        {...field}
        {...props}
      />

      <div className={styles.colors__infos}></div>

      <div className={toggle ? styles.toggle : ""}>
        <ColorExtractor getColors={(colors) => setColors(colors)}>
          <img src={colorImage} style={{ display: "none" }} alt='' />
        </ColorExtractor>

        <div className={styles.wheel}>
          {colors?.map((color, i) => (
            <div
              className={styles.square__color}
              key={i}
              style={{ backgroundColor: color }}
              onClick={() => {
                setProduct({
                  ...product,
                  color: { color, image: product.color.image },
                });
              }}
            >
              {color}
            </div>
          ))}
        </div>
      </div>

      {colors.length > 0 && (
        <TbArrowUpRightCircle
          className={styles.toggle__btn}
          onClick={() => setToggle((prev) => !prev)}
          style={{ transform: `${toggle ? "rotate(180deg)" : ""}` }}
        />
      )}
    </div>
  )
}

export default ColorsForm;