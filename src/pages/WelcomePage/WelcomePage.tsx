import { HelloWorld } from 'components/HelloWorld/HelloWorld';
import styles from './WelcomePage.module.scss';

export const WelcomePage = () => {
  return (
    <section className={styles.welcome}>
      2
      <HelloWorld />
    </section>
  );
};
