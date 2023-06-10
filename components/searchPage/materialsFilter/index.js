import { useRouter } from "next/router";
import { useState } from "react";
import styles from '../styles.module.scss';
import { FaMinus } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';

const MaterialsFilter = ({ materials, materialHandler, replaceQuery, }) => {
  const router = useRouter();
  const [show, setShow] = useState(true);
  const existedMaterial = router.query.pattern || "";

  return (
    <div className={styles.filter}>
      <h3>
        Materials
        <span onClick={() => setShow((prev) => !prev)} >
          {show ? <FaMinus /> : <BsPlusLg />}
        </span>
      </h3>
      {
        show && (
          <div className={styles.filter__sizes}>
            {materials?.map((material, i) => {
              //  const check = replaceQuery("material", material);
              const check = false
              return (
                <label
                  key={i}
                  htmlFor={material}
                  className={styles.filter__sizes_size}
                  onClick={() => materialHandler(existedMaterial ? `${existedMaterial}_${material}` : material)}
                >
                  <input
                    type="checkbox"
                    name="material"
                    id={material}
                    checked={check.active}
                  />
                  <label htmlFor={material}>
                    {material.length > 12
                      ? `${material.substring(0, 12)}...`
                      : material}
                  </label>
                </label>
              )
            })}
          </div>
        )
      }
    </div>
  )
}

export default MaterialsFilter;