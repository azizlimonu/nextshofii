import { useRouter } from "next/router";
import { useState } from "react";
import styles from '../styles.module.scss';
import { FaMinus } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';

const GendersFilter = ({ genderHandler, replaceQuery }) => {
  const router = useRouter();
  const genders = ["Men", "Women", "Unisex"];
  const [show, setShow] = useState(true);
  const existedGender = router.query.gender || "";

  return (
    <div className={styles.filter}>
      <h3>
        Gender
        <span onClick={() => setShow((prev) => !prev)}>
          {show ? <FaMinus /> : <BsPlusLg />}
        </span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {genders.map((gender, i) => {
            // const check = replaceQuery("gender", gender);
            const check = false;
            return (
              <label
                key={i}
                htmlFor={gender}
                className={styles.filter__sizes_size}
                onClick={() => genderHandler(existedGender ? `${existedGender}_${gender}` : gender)}
              >
                <input
                  type="checkbox"
                  name="gender"
                  id={gender}
                  checked={check.active}
                />
                <label htmlFor={gender}>{gender}</label>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GendersFilter;