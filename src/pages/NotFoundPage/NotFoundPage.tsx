import { Text, TextAlign } from 'components/Text/Text';
import styles from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.notFound}>
      <Text title="404" text={t('Page not found') as string} align={TextAlign.CENTER} />
    </section>
  );
};
