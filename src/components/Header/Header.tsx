import { Logo } from 'components/Logo';
import { Options } from 'components/Options';
import { User } from 'components/User';
import styles from './Header.module.scss';
import { Navigation } from 'components/Navigation';
import { useEffect, useState } from 'react';

export const Header: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${scrollTop && styles.headerAnimated}`}>
      <div className={styles.headerContainer}>
        <Logo scrollTop={scrollTop} />
        <User scrollTop={scrollTop} />
        <div className={styles.headerSubContainer}>
          <Options />
          <Navigation />
        </div>
      </div>
    </header>
  );
};
