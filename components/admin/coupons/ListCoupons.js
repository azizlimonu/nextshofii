import React from 'react';
import ListItem from './ListItem';
import styles from './styles.module.scss';

const ListCoupons = ({ coupons, setCoupons }) => {
  return (
    <div className={styles.list}>
      {coupons.map((item) => (
        <ListItem
          key={item._id}
          coupon={item}
          setCoupons={setCoupons} />
      ))}
    </div>
  )
}

export default ListCoupons;