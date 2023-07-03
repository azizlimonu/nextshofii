import React, { useState } from 'react';
import styles from './header.module.scss';
import { MdSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountCircleFill, RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import Image from 'next/image';
import UserMenu from './UserMenu';
import { useSession } from 'next-auth/react';
// import indFlag from '../../public/'

export const Top = ({ country }) => {
  const [visible, setVisible] = useState(false);
  const { data: session } = useSession();

  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div></div>

        <ul className={styles.top__list}>
          <li className={styles.li}>
            <div style={{ borderRadius: '50%', overflow: 'hidden', position: 'relative' }}>
              <img src={country?.flag} alt="" />
            </div>
            <span>{country?.name}</span>
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
            {session ? (
              <div className={styles.flex}>
                <img src={session?.user?.image} alt="" />
                <span>{session?.user?.name}</span>
                <RiArrowDropDownFill />
              </div>
            ) : (
              <div className={styles.flex}>
                <RiAccountCircleFill />
                <span>Account</span>
                <RiArrowDropDownFill />
              </div>
            )}
            {visible && <UserMenu session={session} />}
          </li>

        </ul>
      </div>
    </div>
  )
}
