import { useTranslation } from 'react-i18next';
import styles from './HelloWorld.module.scss';
import classNames from 'classnames';

export const HelloWorld = () => {
  const { t } = useTranslation();
  return <h1 className={classNames('ta-c', styles.main)}>{t('Hello, world!')}</h1>;
};
