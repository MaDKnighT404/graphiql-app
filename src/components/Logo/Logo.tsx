import styles from './Logo.module.scss';

interface LogoProps {
  scrollTop: number;
}

export const Logo: React.FC<LogoProps> = ({ scrollTop }) => {
  return <div className={`${styles.logo} ${scrollTop && styles.logoAnimated}`}></div>;
};
