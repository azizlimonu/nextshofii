import db from "../../utils/db";
import Product from "../../models/ProductModel";
import Category from '../../models/CategoryModel';
import SubCategory from '../../models/SubCategoryModel';

import styles from '../../styles/product.module.scss';

import ProductInfo from "../../components/productPage/productInfo";
import Reviews from "../../components/productPage/review";
import ProductSwiper from '../../components/productPage/productSwiper';

import Head from "next/head";
import { useState } from "react";

export default function ProductPage({ product }) {
  const [activeImage, setActiveImage] = useState("");

  console.log(product);
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
            <ProductInfo product={product} activeImage={activeImage} />
          </div>

          <Reviews />

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
    // style,
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
  };

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
