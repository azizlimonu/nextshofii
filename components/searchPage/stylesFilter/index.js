import { useState } from 'react';
import styles from '../styles.module.scss';
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import { useRouter } from "next/router";

const StylesFilter = ({
  data, styleHandler, replaceQuery
}) => {
  const router = useRouter();
  const [show, setShow] = useState(true);
  const existedStyle = router.query.style || "";

  return (
    <div className={styles.filter}>
      <h3>
        Style
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
          {data.map((style, i) => {
            // const check = replaceQuery("style", style);
            const check = false;
            return (
              <div
                key={i}
                className={styles.filter__sizes_size}
                onClick={() => styleHandler(existedStyle ?`${existedStyle}_${style}` : style)}
              >
                <input
                  type="checkbox"
                  name="style"
                  id={style}
                  checked={check.active}
                />
                <label htmlFor={style}>{style}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default StylesFilter;