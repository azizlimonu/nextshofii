import React from 'react';
import Image from 'next/image';
import styles from './main.module.scss';

const Ads = () => {
  return (
    <div className={styles.ads}>
      <Image src="/ads.jpg"  alt="ads" width={300} height={530}/>
    </div>
  )
}

export default Ads