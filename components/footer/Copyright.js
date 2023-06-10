import React from 'react';
import styles from './footer.module.scss';
import Link from 'next/link';
import { IoLocationSharp } from "react-icons/io5";

const Copyright = ({ country }) => {
  const data = [
    {
      name: "Privacy Center",
      link: "",
    },
    {
      name: "Privacy & Cookie Policy",
      link: "",
    },
    {
      name: "Manage Cookies",
      link: "",
    },
    {
      name: "Terms & Conditions",
      link: "",
    },
    {
      name: "Copyright Notice",
      link: "",
    },
  ];

  return (
    <div className={styles.footer__copyright}>
      <section>
        @2022 Shofii Rights Resereved
      </section>

      <section>
        <ul>
          {data?.map((item, idx) => (
            <li key={idx}>
              <Link href={item.link}>{item.name}</Link>
            </li>
          ))}
          <li>
            <IoLocationSharp /> {country?.name}
          </li>
        </ul>
      </section>
    </div>

  )
}

export default Copyright