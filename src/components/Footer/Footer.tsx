import rsSchoolLogo from '../../shared/assets/images/rs_school_logo.svg';
import githubLogo from '../../shared/assets/images/github_logo.svg';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.teamWrapper}>
        <a href="https://github.com/egatsak">
          <img src={githubLogo} className={styles.githubLogo} alt="Github logo" />
        </a>
        <a href="https://github.com/Exelery">
          <img src={githubLogo} className={styles.githubLogo} alt="Github logo" />
        </a>
        <a href="https://github.com/MaDKnighT404">
          <img src={githubLogo} className={styles.githubLogo} alt="Github logo" />
        </a>
      </div>
      <p>2023</p>
      <div className={styles.rsschoolWrapper}>
        <a href="https://rs.school/">
          <img src={rsSchoolLogo} className={styles.rsSchoolLogo} alt="RSSchool logo" />
        </a>
      </div>
    </footer>
  );
};
