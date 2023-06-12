import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'app/providers/ThemeProvider';
import { Button, ButtonTheme } from 'components/Button/Button';
import { Text } from 'components/Text/Text';

import classNames from 'classnames';

import styles from './PageError.module.scss';

interface PageErrorProps {
  className?: string;
}

export const PageError: FC<PageErrorProps> = (props) => {
  const { className } = props;
  const { theme } = useTheme();
  const { t } = useTranslation();

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={classNames('app', theme, styles.pageError, className)}>
      <Text title={t('ErrorBoundary has caught an Unexpected Error')} />
      <Button onClick={reloadPage} theme={ButtonTheme.OUTLINE}>
        {t('Reload page')}
      </Button>
    </div>
  );
};
