import React from 'react';
import Header from '../header';
import Footer from '../footer';
import { useRouter } from 'next/router';

const Layout = ({ children, searchHandler }) => {
  const router = useRouter();
  const isInsideAdminPath = router.pathname.startsWith('/admin');

  const country = {
    name: "Indonesia",
    flag: "https://cdn.ipregistry.co/flags/emojitwo/id.svg"
  };

  return (
    <>
      {isInsideAdminPath ? (
        <>
          {children}
        </>
      ) : (
        <>
          <Header country={country} searchHandler={searchHandler} />
          {children}
          <Footer country={country} />
        </>
      )}
    </>
  );
};

export default Layout;

// export async function getServerSideProps() {
//   let data = await axios
//     .get(`https://api.ipregistry.co/?key=${process.env.COUNTRY_API_KEY}`)
//     .then((res) => {
//       return res.data.location.country;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   return {
//     props: {
//       country: { name: data.name, flag: data.flag.emojitwo },
//     },
//   };
// };