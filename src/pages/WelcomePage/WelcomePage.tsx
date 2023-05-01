import { HelloWorld } from 'components/HelloWorld/HelloWorld';
import styles from './WelcomePage.module.scss';
import { Auth } from 'components/AuthForm/AuthForm';

export const WelcomePage = () => {
  return (
    <section className={styles.welcome}>
      <Auth />
    </section>
  );
};
