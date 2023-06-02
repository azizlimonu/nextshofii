import React, { useState } from 'react';
import styles from './style.module.scss';
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from 'react-icons/bs';
import { sizesList } from '../../../../data/sizes';

const SizesForm = ({ sizes, product, setProduct }) => {
  const [noSize, setNoSize] = useState(false);

  const handleSize = (i, e) => {
    let values = [...sizes];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, sizes: values });
    console.log("values", values);
  };

  const handleRemove = (i) => {
    if (sizes.length > 1) {
      const values = [...sizes];
      values.splice(i, 1);
      setProduct({ ...product, sizes: values });
    }
  };

  const handleResetSize = () => {
    if (!noSize) {
      let data = sizes.map((item) => {
        return {
          qty: item.qty,
          price: item.price,
        };
      });
      setProduct({ ...product, sizes: data });
    } else {
      let data = sizes.map((item) => {
        return {
          size: item.size || "",
          qty: item.qty,
          price: item.price,
        };
      });
      setProduct({ ...product, sizes: data });
    }
    setNoSize((prev) => !prev);
  };

  return (
    <div>
      <div className={styles.header}>Sizes / Quantity /Price</div>

      <button
        type="reset"
        className={styles.click_btn}
        onClick={() => handleResetSize()}
      >
        {noSize ? "Click if product has size" : "Click if product has no size"}
      </button>

      {sizes && (
        sizes?.map((size, i) => (
          <div className={styles.clicktoadd} key={i}>
            <select
              name="size"
              value={noSize ? "" : size.size}
              disabled={noSize}
              style={{ display: `${noSize ? "none" : ""}` }}
              onChange={(e) => handleSize(i, e)}
            >
              <option value="">Select a size</option>
              {sizesList.map((list, i) => (
                <option value={list} key={i}>
                  {list}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="qty"
              placeholder={noSize ? "Product Quantity" : "Size Quantity"}
              min={1}
              value={size.qty}
              onChange={(e) => handleSize(i, e)}
            />

            <input
              type="number"
              name="price"
              placeholder={noSize ? "Product Price" : "Size Price"}
              min={1}
              value={size.price}
              onChange={(e) => handleSize(i, e)}
            />

            {!noSize && (
              <>
                <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                <BsFillPatchPlusFill
                  onClick={() => {
                    setProduct({
                      ...product,
                      sizes: [
                        ...sizes,
                        {
                          size: "",
                          qty: "",
                          price: "",
                        },
                      ],
                    });
                  }}
                />
              </>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export default SizesForm;