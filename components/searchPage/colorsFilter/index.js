import { useRouter } from "next/router";
import { useState } from "react";
import styles from '../styles.module.scss';
import { FaMinus } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';

const ColorsFilter = ({ colors, colorHandler, replaceQuery }) => {
  const router = useRouter();
  const [show, setShow] = useState(true);

  return (
    <div className={styles.filter}>
      <h3>
        Colors
        <span onClick={() => setShow((prev) => !prev)} >
          {show ? <FaMinus /> : <BsPlusLg />}
        </span>
      </h3>
      {
        show && (
          <div className={styles.filter__colors}>
            {colors?.map((color, i) => {
              // const check = replaceQuery("color", color);
              const check = false
              return (
                <button
                  style={{ background: `${color}` }}
                  className={check.active ? styles.activeFilterColor : ""}
                  onClick={() => colorHandler(check.result)}
                  key={i}
                >

                </button>
              )
            })}
          </div>
        )
      }
    </div>
  )
}

export default ColorsFilter;