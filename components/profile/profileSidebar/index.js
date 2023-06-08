import React from 'react';
import styles from './style.module.scss';
import { sidebarData } from '../../../data/profile';
import ListSidebar from './ListSidebar';

const ProfileSidebar = ({ data }) => {

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__container}>
        <img src={data.image} alt="" />
        <span className={styles.sidebar__name}>{data.name}</span>

        <ul>
          {sidebarData.map((item, idx) => (
            <ListSidebar
              key={idx}
              item={item}
              visible={data.tab == idx.toString()}
              index={idx.toString()}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProfileSidebar;