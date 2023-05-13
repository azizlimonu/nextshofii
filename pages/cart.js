import React from 'react'
import Header from '../components/header';
import Footer from '../components/footer';

const cart = () => {
  const country = {
    name: "Indonesia",
    flag: "https://cdn.ipregistry.co/flags/emojitwo/id.svg"
  };

  return (
    <>
      <Header country={country} />
      <div>cart</div>
      <Footer country="Indonesia" />
    </>
  )
}

export default cart;