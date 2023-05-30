import React from 'react';
import styles from './styles.module.scss';
import ListSubCat from './ListSubCat';

const ListsSubCat = ({ categories, subCategories, setSubCategories }) => {
  return (
    <div className={styles.list}>
      {subCategories?.map((sub, i) => (
        <ListSubCat
          subCategory={sub}
          key={sub._id}
          setSubCategories={setSubCategories}
          categories={categories}
        />
      ))}
    </div>
  )
}

export default ListsSubCat;