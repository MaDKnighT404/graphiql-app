import { memo } from 'react';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { Button, ButtonTheme } from 'components/Button/Button';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <Button theme={ButtonTheme.OUTLINE} className={classNames(className)} onClick={toggleTheme}>
      {theme === Theme.DARK ? t('Light') : t('Dark')}
    </Button>
  );
});
