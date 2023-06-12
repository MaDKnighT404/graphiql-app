import { Button } from '../../Button/Button';
import styles from './Sidebar.module.scss';
import { ReactComponent as Reload } from '@/shared/assets/icons/reload.svg';
import { ReactComponent as DocIcon } from '@/shared/assets/icons/doc.svg';
import classNames from 'classnames';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  setDocsOpen: Dispatch<SetStateAction<boolean>>;
  reloading: boolean;
  buildSchemaFromData: () => Promise<void>;
};

export const Sidebar = ({ setDocsOpen, reloading, buildSchemaFromData }: Props) => {
  const { t } = useTranslation();

  const refetchSchema = useCallback(() => {
    buildSchemaFromData();
  }, [buildSchemaFromData]);

  return (
    <div className={styles.sidebar}>
      <Button
        title={t('Show documentation Explorer')!}
        className={styles.btn}
        onClick={() => setDocsOpen((prev) => !prev)}
      >
        <DocIcon />
      </Button>
      <Button
        title={t('Re-fetch GraphQL schema')!}
        className={styles.btn}
        onClick={() => refetchSchema()}
      >
        <Reload className={classNames({ [styles.rotateEffect]: reloading })} />
      </Button>
    </div>
  );
};
