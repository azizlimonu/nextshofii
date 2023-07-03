import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Main from '../components/home/main/Main';
import FlashDeals from '../components/home/flashdeals/FlashDeals';
import Category from '../components/home/category';
import { useMediaQuery } from "react-responsive";
import {
  women_dresses,
  women_shoes,
  women_accessories,
  women_swiper,
  gamingSwiper,
  homeImprovSwiper
} from '../data/Home';
import ProductSwiper from '../components/productswiper';
import db from '../utils/db';
import Product from '../models/ProductModel';
import ProductCard from '../components/productCard';
import Layout from '../components/layout/Layout';

export default function Home({ products }) {

  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });

  return (
    <>
      <Head>
        <title>Shofii | Home</title>
        <meta name="keywords" content="Shofii Ecommerce - Belanja Online" />
      </Head>

      <Layout>
        <div className={styles.home}>
          <div className={styles.container}>
            <Main />
            <FlashDeals />

            <div className={styles.home__category}>
              <Category
                header="Dresses"
                products={women_dresses}
                background="#5a31f4"
              />

              {!isMedium && (
                <Category
                  header="Shoes"
                  products={women_shoes}
                  background="#3c811f"
                />
              )}

              {isMobile && (
                <Category
                  header="Shoes"
                  products={women_shoes}
                  background="#3c811f"
                />
              )}

              <Category
                header="Accessories"
                products={women_accessories}
                background="#000"
              />
            </div>

            {/* Product Swiper */}
            <ProductSwiper
              products={women_swiper}
              background="#3c811f"
              header="Women"
            />
            <ProductSwiper
              products={gamingSwiper}
              background="#3c811f"
              header="Women"
            />
            <ProductSwiper
              products={homeImprovSwiper}
              background="#3c811f"
              header="Women"
            />

            <div className={styles.products}>
              {products?.map((item) => (
                <ProductCard
                  product={item}
                  key={item._id}
                />
              ))}
            </div>
          </div>

        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  db.connectDb();
  let products = await Product.find().sort({ createdAt: -1 }).lean();
  db.disconnectDb();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}
