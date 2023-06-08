import React from 'react';
import styles from '../styles/search.module.scss';
import db from '../utils/db';
import Product from '../models/ProductModel';
import Category from '../models/CategoryModel';
import SubCategory from '../models/SubCategoryModel';
import { filterArray, randomize, removeDuplicates } from '../utils/arrayUtils';

import Link from 'next/link';
import { useRouter } from "next/router";

import ProductCard from '../components/productCard';
import CategoryFilter from '../components/searchPage/categoryFilter';
import SizesFilter from '../components/searchPage/sizesFilter';

const SearchPage = ({
  categories,
  products,
  subCategories,
  sizes
}) => {
  console.log(sizes);

  const router = useRouter();

  const replaceQuery = (queryName, value) => {

  };

  const categoryHandler = (category) => {

  };

  const sizeHandler = (size) => {

  };

  return (
    <div className={styles.browse__container}>
      <div>
        <div className={styles.browse__path}>Home / Browse</div>
        <div className={styles.browse__tags}>
          {categories.map((c) => (
            <Link href="" key={c._id}>
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      <div
        className={`${styles.browse__store}`}
      >
        <div
          className={`${styles.browse__store_filters} ${styles.scrollbar}`}
        >
          <button
            className={styles.browse__clearBtn}
            onClick={() => router.push("/browse")}
          >
            Clear All ({Object.keys(router.query).length})
          </button>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            subCategories={subCategories}
            categoryHandler={categoryHandler}
            replaceQuery={replaceQuery}
          />

          {/* Sizes Filter */}
          <SizesFilter sizes={sizes} sizeHandler={sizeHandler} />

          {/* Colors Filter */}
          
          {/* Brands Filter */}
          {/* Styles Filter */}
          {/* Patterns Filter */}
          {/* Materials Filter */}
          {/* Genders Filter */}
        </div>

        <div className={styles.browse__store_products_wrap}>
          {/* Heading Filters */}

          <div className={styles.browse__store_products}>
            {products?.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>

          <div className={styles.pagination}>
            {/* Pagination */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage;

export async function getServerSideProps(context) {
  // get query
  const { query } = context;
  const sortQuery = query.sort || "";


  // ====> Get data From Db <==== //
  db.connectDb();
  let productsDb = await Product.find({}).sort().lean();
  let categories = await Category.find().lean();
  let subCategories = await SubCategory.find()
    .populate({
      path: "parent",
      model: Category,
    })
    .lean();
  let products = sortQuery && sortQuery !== ""
    ? productsDb
    : randomize(productsDb);

  let colors = await Product.find().distinct(
    "subProducts.color.color"
  );
  let brandsDb = await Product.find().distinct("brand");
  let sizes = await Product.find().distinct(
    "subProducts.sizes.size"
  );
  let details = await Product.find().distinct("details");
  let stylesDb = filterArray(details, "Style");
  let patternsDb = filterArray(details, "Pattern Type");
  let materialsDb = filterArray(details, "Material");
  let styles = removeDuplicates(stylesDb);
  let patterns = removeDuplicates(patternsDb);
  let materials = removeDuplicates(materialsDb);
  let brands = removeDuplicates(brandsDb);


  db.disconnectDb();
  // ====>

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      products: JSON.parse(JSON.stringify(products)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      sizes,
    }
  };
};