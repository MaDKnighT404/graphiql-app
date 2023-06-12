import rsSchoolLogo from '../../shared/assets/images/rs_school_logo.svg';
import githubLogo from '../../shared/assets/images/github_logo.svg';
import styles from './Footer.module.scss';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTeam}>
          <span className={styles.footerTeamText}>{t('Team')}</span>
          <a href="https://github.com/egatsak" className={styles.footerTeamLink}>
            <img src={githubLogo} className={styles.githubLogo} alt="Github logo" />
          </a>
          <a href="https://github.com/Exelery" className={styles.footerTeamLink}>
            <img src={githubLogo} className={styles.githubLogo} alt="Github logo" />
          </a>
          <a href="https://github.com/MaDKnighT404" className={styles.footerTeamLink}>
            <img src={githubLogo} className={styles.githubLogo} alt="Github logo" />
          </a>
        </div>

        <p>2023</p>

        <a href="https://rs.school/">
          <img src={rsSchoolLogo} className={styles.rsSchoolLogo} alt="RSSchool logo" />
        </a>
      </div>
    </footer>
  );
};
