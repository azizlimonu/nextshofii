import styles from './header.module.scss';
import { Top } from './Top';
import Main from './Main';

export default function Header({ searchHandler, country }) {

  return (
    <header className={styles.header}>
      <Top country={country} />
      <Main searchHandler={searchHandler} />
    </header>
  )
}