import styles from './header.module.scss';
import Ads from './Ad1'
import { Top } from './Top';
import Main from './Main';

export const Header = ({ country }) => {
  return (
    <header className={styles.header}>
      <Ads />
      <Top country={country} />
      <Main />
    </header>
  )
}
