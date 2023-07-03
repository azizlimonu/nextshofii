import React from 'react'
import Layout from '../components/layout/Layout';
import Link from 'next/link';

const NotFound = () => {
  return (
    <Layout>
      <div className='container flex' style={{flexDirection:"column",marginBottom:"4rem"}}>
        <h1 style={{
          fontSize: "300px"
        }}>
          404
        </h1>
        <p style={{
          fontSize: "1.3rem"
        }}>
          Page that you looking for is Not Found Please return to the {" "}
          <Link href="/" style={{ textDecoration: "underline" }}>Home Page</Link>
        </p>
      </div>
    </Layout>
  )
}

export default NotFound;