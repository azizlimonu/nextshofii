import React, { useState } from 'react';
import styles from './header.module.scss';
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import Image from 'next/image';
import UserMenu from './UserMenu';
// import indFlag from '../../public/'

export const Top = ({ country }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>

        <ul className={styles.top__list}>
          <li className={styles.li}>
            <div style={{ borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
              <Image
                src={country?.flag}
                alt={country.name}
                height={40}
                width={40}
                style={{ objectFit: "cover" }}
              />
            </div>
            <span>{country.name}</span>
          </li>

          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer Protection</span>
          </li>

          <li className={styles.li}>
            <span>Customer Service</span>
          </li>

          <li className={styles.li}>
            <span>Help</span>
          </li>

          <li className={styles.li}>
            <BsSuitHeart />
            <Link href="/profile/whishlist">
              <span>Whishlist</span>
            </Link>
          </li>

          <li
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {/* <li className={styles.li}>
              <div className={styles.flex}>
                <RiAccountPinCircleLine />
                <span>Account</span>
                <RiArrowDropDownFill />
              </div>
            </li> */}
            {/* if user exist */}
            <li className={styles.li}>
              <div className={styles.flex}>
                <Image
                  src='/images/profile.png'
                  alt=''
                  width={78}
                  height={78}
                />
                <span>Aziz Limonu</span>
                <RiArrowDropDownFill />
              </div>
            </li>
            {visible && <UserMenu />}
          </li>

        </ul>
      </div>
    </div>
  )
}
