import React from 'react';
import styles from './circledicon.module.scss';
import { BiRightArrow } from 'react-icons/bi';

const CircledIconBtn = ({ type, text }) => {
  return (
    <button className={styles.button} type={type}>
      {text}
      <div className={styles.svg__wrap}>
        <BiRightArrow />
      </div>
    </button>
  )
}

export default CircledIconBtn;