import React from 'react';
import Header from '../header';
import Footer from '../footer';

const Layout = ({ children }) => {

  const country = {
    name: "Indonesia",
    flag: "https://cdn.ipregistry.co/flags/emojitwo/id.svg"
  };

  return (
    <>
      <Header country={country} />
      {children}
      <Footer country={country} />
    </>
  )
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