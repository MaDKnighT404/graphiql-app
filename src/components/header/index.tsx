import { HelloWorld } from '../HelloWorld';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../providers/ThemeProvider';
import classNames from 'classnames';
import './index.scss';

export const Header = () => {
  const { i18n, t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="header">
      <div className={classNames('App', theme)}>
        <button
          onClick={() => {
            i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
          }}
        >
          {t('Switch lang')}
        </button>
        <button onClick={toggleTheme}> {t('Switch theme')}</button>
        <HelloWorld />
      </div>
    </header>
  );
};
