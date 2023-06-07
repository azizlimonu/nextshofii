import React from 'react';
import styles from './style.module.scss';
import { sidebarData } from '../../../data/profile';
import ListSidebar from './ListSidebar';

const ProfileSidebar = ({ data }) => {
  console.log("DATA PROFILE SIDEBAR", data);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <img src={data.image} alt="" />
        <span className={styles.sidebar__name}>{data.name}</span>

        <ul>
          {sidebarData.map((item, i) => (
            <ListSidebar
              key={i}
              item={item}
              visible={data.tab == i.toString()}
              index={i.toString()}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProfileSidebar;