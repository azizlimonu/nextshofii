import { useState } from 'react';
import { useRouter } from "next/router";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { signOut } from "next-auth/react";
import Link from "next/link";
import slugify from "slugify";
import styles from './style.module.scss';

const ListSidebar = (item, visible, index) => {
  const [show, setShow] = useState(visible);
  const router = useRouter();
  console.log('item that pass', item);
  return (
    <li>
      {item.item.heading == "Sign out" ? (
        <b onClick={() => signOut()}>Sign out</b>
      ) : (
        <b onClick={() => setShow((prev) => !prev)}>
          {item.item.heading} {show ? <HiMinusSm /> : <HiPlusSm />}
        </b>
      )}
      {show && (
        <ul>
          {item.item.links?.map((link, i) => (
            <>
              {link.link.startsWith("/profile/orders") ? (
                <li
                  className={
                    (router.query.q?.split("__")[0] || "") ==
                      slugify(link.name, { lower: true })
                      ? styles.active
                      : ""
                  }
                >
                  <Link
                    href={`${link.link}?tab=${index}&q=${slugify(link.name, {
                      lower: true,
                    })}__${link.filter}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ) : (
                <li
                  className={
                    (router.query.q || "") ==
                      slugify(link.name, { lower: true })
                      ? styles.active
                      : ""
                  }
                >
                  <Link
                    href={`${link.link}?tab=${index}&q=${slugify(link.name, {
                      lower: true,
                    })}`}
                  >
                    {link.name}
                  </Link>
                </li>
              )}
            </>
          ))}
        </ul>
      )}
    </li>
  )
}

export default ListSidebar;