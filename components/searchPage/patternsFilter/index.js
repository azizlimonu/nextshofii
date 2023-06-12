import { useRouter } from "next/router";
import { useState } from "react";
import styles from '../styles.module.scss';
import { FaMinus } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';

const PatternsFilter = ({ patterns, patternHandler, replaceQuery, }) => {
  const router = useRouter();
  const [show, setShow] = useState(true);
  const existedPattern = router.query.pattern || "";

  return (
    <div className={styles.filter}>
      <h3>
        Pattern
        <span onClick={() => setShow((prev) => !prev)}>
          {
            show ? <FaMinus /> : <BsPlusLg />
          }
        </span>
      </h3>
      {show && (
        <div className={styles.filter__sizes}>
          {patterns.map((pattern, i) => {
            const check = replaceQuery("pattern", pattern);
            
            return (
              <label
                key={i}
                htmlFor={pattern}
                className={styles.filter__sizes_size}
                onClick={() => patternHandler(check.result)}
              >
                <input
                  type="checkbox"
                  name="pattern"
                  id={pattern}
                  checked={check.active}
                />
                <label htmlFor={pattern}>
                  {pattern.length > 12
                    ? `${pattern.substring(0, 12)}...`
                    : pattern}
                </label>
              </label>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default PatternsFilter;