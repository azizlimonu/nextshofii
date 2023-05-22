import React, { useEffect, useState } from 'react';
import styles from './header.module.scss';
import { compareArrays } from '../../../utils/arrayUtils';

const HeaderCart = ({ cartItems, selected, setSelected }) => {
  const [active, setActive] = useState();

  useEffect(()=>{
    const check = compareArrays(cartItems, selected);
    setActive(check);
  },[cartItems, selected]);

  const handleSelect = () => {
    // check length of selected if not same with cart array than it means theyre not selected all
    if (selected.length !== cartItems.length) {
      setSelected(cartItems);
    } else {
      setSelected([]);
    }
  }

  return (
    <div className={`${styles.cart__header} ${styles.card}`}>

      <h1>Item Summary({cartItems.length})</h1>

      <div className={styles.flex} onClick={() => handleSelect()}>
        <div
          className={`${styles.checkbox} ${active ? styles.active : ""}`}
        ></div>

        <span>Select all items</span>
      </div>

    </div>
  )
}

export default HeaderCart;