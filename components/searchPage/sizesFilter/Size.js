import styles from '../styles.module.scss';

const Size = ({ size }) => {

  return (
    <label htmlFor={size} className={styles.filter__sizes_size}>
      <input type="checkbox" name="size" id={size} />
      <label htmlFor={size}>{size}</label>
    </label>
  )  
}

export default Size;