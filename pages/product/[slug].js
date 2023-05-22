import db from "../../utils/db";
import Product from "../../models/ProductModel";
import Category from '../../models/CategoryModel';
import SubCategory from '../../models/SubCategoryModel';
import User from '../../models/UserModel';

import styles from '../../styles/product.module.scss';

import ProductInfo from "../../components/productPage/productInfo";
import Reviews from "../../components/productPage/review";
import ProductSwiper from '../../components/productPage/productSwiper';

import Head from "next/head";
import { useState } from "react";

export default function ProductPage({ product }) {
  const [activeImage, setActiveImage] = useState("");

  // console.log(product);
  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>

      <div className={styles.product}>
        <div className={styles.product__container}>

          <div className={styles.path}>
            Home / {product.category.name}
            {product.subCategories.map((sub, i) => (
              <span key={i}>/{sub.name}</span>
            ))}
          </div>

          <div className={styles.product__main}>
            <ProductSwiper images={product.images} activeImage={activeImage} />
            <ProductInfo product={product} setActiveImage={setActiveImage} />
          </div>

          <Reviews product={product} />

          {/* Related Product */}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {

  const { query } = context;
  const { slug } = query;

  const style = query.style;
  const size = query.size || 0;

  await db.connectDb();

  let product = await Product.findOne({ slug })
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategories", model: SubCategory })
    .populate({ path: "reviews.reviewBy", model: User })
    .lean();

  let subProduct = product?.subProducts[style];

  let prices = subProduct?.sizes
    .map((s) => {
      return s.price;
    })
    .sort((a, b) => {
      return a - b;
    });


  let newProduct = {
    ...product,
    style,
    images: subProduct?.images,
    sizes: subProduct?.sizes,
    discount: subProduct?.discount,
    colors: product?.subProducts?.map((p) => {
      return p.color;
    }),
    priceRange: prices.length > 1
      ? `From ${prices[0]} to ${prices[prices.length - 1]}$`
      : "",
    price: subProduct?.discount > 0
      ? (
        subProduct.sizes[size].price -
        subProduct.sizes[size].price / subProduct.discount
      ).toFixed(2)
      : subProduct.sizes[size].price,
    priceBefore: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
    ratings: [
      {
        percentage: calculatePercentage("5"),
      },
      {
        percentage: calculatePercentage("4"),
      },
      {
        percentage: calculatePercentage("3"),
      },
      {
        percentage: calculatePercentage("2"),
      },
      {
        percentage: calculatePercentage("1"),
      },
    ],
    reviews: product.reviews.reverse(),
    allSizes: product.subProducts
      .map((p) => {
        return p.sizes;
      })
      .flat()
      .sort((a, b) => {
        return a.size - b.size;
      })
      .filter(
        (element, index, array) =>
          array.findIndex((el) => el.size === element.size) === index
      ),
  };

  // -------------- //
  function calculatePercentage(num) {
    return (
      (product.reviews.reduce((a, review) => {
        return (
          a +
          (review.rating == Number(num) || review.rating == Number(num) + 0.5)
        );
      }, 0) *
        100) /
      product.reviews.length
    ).toFixed(1);
  }
  // -------------- //

  // console.log("New Product", newProduct);
  // console.log("style", style);
  // console.log("price", price);
  // console.log("Product", product.subProducts[0].sizes);

  await db.disconnectDb();


  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
    },
  };
}
