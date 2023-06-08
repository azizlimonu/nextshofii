import { useState } from 'react';
import styles from '../styles.module.scss';
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import CardCategory from './CardCategory';

const CategoryFilter = ({
  categories,
  subCategories,
  categoryHandler,
  replaceQuery,
}) => {
  console.log(categories);

  const [show, setShow] = useState(true);

  return (
    <div className={styles.filter}>
      <h3>
        Category
        <span onClick={() => setShow((prev) => !prev)}>
          {
            show
              ? <FaMinus />
              : <BsPlusLg />
          }
        </span>
      </h3>

      {show &&
        categories?.map((category, i) => (
          <CardCategory
            key={i}
            category={category}
            subCategories={subCategories}
            categoryHandler={categoryHandler}
            replaceQuery={replaceQuery}
          />
        ))}
    </div>
  )
}

export default CategoryFilter;