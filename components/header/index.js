import styles from './styles.module.scss';
import Ads from './Ad1'
import { Top } from './Top';
import Main from './Main';

export const Header = ({ }) => {
  return (
    <header className={styles.header}>
      <Ads />
      <Top />
      <Main />
    </header>
  )
}
