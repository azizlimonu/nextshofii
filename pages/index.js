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

export default function Home({ country }) {
  const isMedium = useMediaQuery({ query: "(max-width:850px)" });
  const isMobile = useMediaQuery({ query: "(max-width:550px)" });

  return (
    <>
      <Head>
        <title>Shoppay | Home</title>
        <meta name="keywords" content="Shoppay Ecommerce - Belanja Online" />
      </Head>

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

          <div className={styles.product}>
            {/* product card */}
          </div>
        </div>

      </div>

    </>
  )
}

// export async function getServerSideProps() {

// }
