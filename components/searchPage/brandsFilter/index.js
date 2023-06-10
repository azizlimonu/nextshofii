import { useState } from 'react';
import styles from '../styles.module.scss';
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useRouter } from "next/router";

const BrandsFilter = ({
  brands, brandHandler, replaceQuery
}) => {
  const router = useRouter();
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
        <div className={styles.filter__sizes}>
          {brands.map((brand, i) => {
            // const check = replaceQuery("brand", brand);
            const check = false;
            return (
              <div
                key={i}
                className={`${styles.filter__brand} ${check.active ? styles.activeFilter : ""
                  }`}
                onClick={() => brandHandler(brand)}
              >
                <img src={`/images/brands/${brand}.png`} alt="" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default BrandsFilter;