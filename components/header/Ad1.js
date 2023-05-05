import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import adsImage from '../../public/images/ad.jpg';
import styles from './header.module.scss';

const Ads = () => {
  return (
    <Link href='/'>
      <div className={styles.ads}>
      </div>
    </Link>
  )
}

export default Ads