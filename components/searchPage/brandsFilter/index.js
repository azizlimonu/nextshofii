import { useState } from 'react';
import styles from '../styles.module.scss';
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";

const BrandsFilter = ({
  brands, brandHandler, replaceQuery
}) => {

  const [show, setShow] = useState(true);

  return (
    <div className={styles.filter}>
      <h3>
        Brands
        <span onClick={() => setShow((prev) => !prev)}>
          {
            show
              ? <FaMinus />
              : <BsPlusLg />
          }
        </span>
      </h3>

      {show && (
        <div>
          {brands.map((brand, i) => {
            // const check = replaceQuery("brand", brand);
            const check = false;
            return (
              <button
                key={i}
                className={`${styles.filter__brand} ${check.active ? styles.activeFilter : ""
                  }`}
                onClick={() => brandHandler(check.result)}
              >
                <img src={`/images/brands/${brand}.png`} alt="" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default BrandsFilter;