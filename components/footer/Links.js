import React from 'react';
import styles from './footer.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const Links = () => {

  const links = [
    {
      heading: "SHOPPAY",
      links: [
        {
          name: "About us",
          link: "",
        },
        {
          name: "Contact us",
          link: "",
        },
        {
          name: "Social Responsibility",
          link: "",
        },
        {
          name: "",
          link: "",
        },
      ],
    },
    {
      heading: "HELP & SUPPORT",
      links: [
        {
          name: "Shipping Info",
          link: "",
        },
        {
          name: "Returns",
          link: "",
        },
        {
          name: "How To Order",
          link: "",
        },
        {
          name: "How To Track",
          link: "",
        },
        {
          name: "Size Guide",
          link: "",
        },
      ],
    },
    {
      heading: "Customer service",
      links: [
        {
          name: "Customer service",
          link: "",
        },
        {
          name: "Terms and Conditions",
          link: "",
        },
        {
          name: "Consumers (Transactions)",
          link: "",
        },
        {
          name: "Take our feedback survey",
          link: "",
        },
      ],
    },
  ];

  return (
    <div className={styles.footer__links}>
      {links?.map((item, idx) => (
        <ul key={idx}>
          {idx === 0 ? (
            <Image
              src='/logo.png'
              alt='logo'
              width={100}
              height={70}
            />
          ) : (
            <b>{item.heading}</b>
          )}

          {item.links?.map((link, idx) => (
            <li key={idx}>
              <Link href={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

export default Links;