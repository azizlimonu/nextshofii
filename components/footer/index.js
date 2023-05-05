import React from 'react'
import styles from './footer.module.scss';
import Links from './Links';
import Socials from './Socials';
import NewsLetter from './NewsLetter';
import Payment from './Payment';
import Copyright from './Copyright';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links />
        <NewsLetter />
        <Socials />
        <Payment />
        <Copyright />
      </div>
    </footer>
  )
}

export default Footer