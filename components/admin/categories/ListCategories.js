import React from 'react';
import styles from './styles.module.scss';
import ListCateogry from './ListCateogry';

const ListCategories = ({ categories, setCategories }) => {
  return (
    <div className={styles.list}>
      {categories?.map((category, i) => (
        <ListCateogry
          key={category._id}
          category={category}
          setCategories={setCategories}
        />
      ))}
    </div>
  )
}

export default ListCategories;