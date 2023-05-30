import React from 'react';
import AdminLayout from '../../../components/admin/layout';
import db from '../../../utils/db';
import Product from '../../../models/ProductModel';
import Category from '../../../models/CategoryModel';
import styles from '../../../styles/allproducts.module.scss';
import ProductCard from '../../../components/admin/products/productCard';

const AllProducts = ({ products }) => {

  return (
    <AdminLayout>
      <div className={styles.header}>All Products</div>

      {products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </AdminLayout>
  )
}

export default AllProducts;

export async function getServerSideProps(context) {

  await db.connectDb();
  const products = await Product.find()
    .populate({ path: "category", model: Category })
    .sort({ createdAt: -1 })
    .lean();
  await db.disconnectDb();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};