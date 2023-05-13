import { useSession } from 'next-auth/react';
import Head from 'next/head';

export default function Home({ country }) {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Shoppay | Home</title>
        <meta name="keywords" content="Shoppay Ecommerce - Belanja Online" />
      </Head>
      <div>
       {session ? "Logged in" : "Not Logged in"}
      </div>
    </>
  )
}

