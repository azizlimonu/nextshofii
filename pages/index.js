import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Main from '../components/home/main/Main';

export default function Home({ country }) {
  return (
    <>
      <Head>
        <title>Shoppay | Home</title>
        <meta name="keywords" content="Shoppay Ecommerce - Belanja Online" />
      </Head>

      <div className={styles.home}>
        <div className={styles.container}>
          <Main />
          {/* flash deals */}

          <div className={styles.home__category}>
            {/* category */}
          </div>

          {/* Product Swiper */}

          <div className={styles.product}>
            {/* product card */}
          </div>
        </div>

      </div>

    </>
  )
}

