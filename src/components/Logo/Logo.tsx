import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './Logo.module.scss';

interface LogoProps {
  scrollTop: number;
}

export const Logo: React.FC<LogoProps> = ({ scrollTop }) => {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleLogoClick = () => {
    if (pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <div
      className={`${styles.logo} ${scrollTop && styles.logoAnimated}`}
      onClick={handleLogoClick}
    ></div>
  );
};
