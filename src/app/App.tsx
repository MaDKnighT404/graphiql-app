/* eslint-disable i18next/no-literal-string */
import { HelloWorld } from 'components/HelloWorld';
import { useTranslation } from 'react-i18next';
import { useTheme } from './providers/ThemeProvider';
import classNames from 'classnames';

export const App = () => {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('App', theme)}>
      <button
        onClick={() => {
          i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
        }}
      >
        Switch lang
      </button>
      <button onClick={toggleTheme}>Switch theme</button>
      <HelloWorld />
    </div>
  );
};
