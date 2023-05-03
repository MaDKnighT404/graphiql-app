import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'shared/lib/hooks/useWindowDimensions/useWindowDimensions';
import { Button, ButtonTheme } from 'components/Button/Button';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher = memo((props: LangSwitcherProps) => {
  const { className } = props;
  const width = useWindowDimensions();
  const { t, i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };

  return (
    <Button className={className} theme={ButtonTheme.OUTLINE} onClick={toggle}>
      {width < 600 ? t('ShortLang') : t('Language')}
    </Button>
  );
});
