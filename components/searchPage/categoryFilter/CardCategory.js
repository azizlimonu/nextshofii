import { useState } from 'react';
import { BsPlusLg } from "react-icons/bs";
import { FaMinus } from "react-icons/fa";
import styles from '../styles.module.scss';

const CardCategory = ({
  category, categoryHandler, replaceQuery, subCategories
}) => {
  const [show, setShow] = useState(false);
  const check = replaceQuery("category", category._id);

  const filteredSubCategories = subCategories.filter(
    subCat => subCat.parent._id === category._id
  );

  return (
    <section>
      <div onClick={() => categoryHandler(category._id)}>
        <input
          type="radio"
          name="filter"
          id={category._id}
          checked={check?.active}
        />

        <label htmlFor={category._id}>
          <a>{category.name}</a>
        </label>

        <span onClick={() => setShow((prev) => !prev)}>
          {
            show
              ? <FaMinus />
              : <BsPlusLg />
          }
        </span>


      </div>

      {show && (
        filteredSubCategories?.map((sub, i) => (
          <div
            style={{
              marginLeft: "3rem"
            }}
            key={i}>
            <label >{sub.name}</label>
          </div>
        ))
      )}

    </section>
  )
}

export default CardCategory