import { useEffect } from 'react';
import styles from './Footer.module.scss';

export const Footer = () => {
  // test errorboundary!
  /*  useEffect(() => {
    if (Math.random() > 0.5) throw new Error();
  }, []); */
  return <footer className={styles.footer}> 000</footer>;
};
