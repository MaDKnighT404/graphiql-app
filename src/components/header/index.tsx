import { HelloWorld } from '../HelloWorld';
import { useTranslation } from 'react-i18next';
import './index.scss';

interface HeaderProps {
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme }) => {
  const { i18n, t } = useTranslation();

  return (
    <header className="header">
      <button
        onClick={() => {
          i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
        }}
      >
        {t('Switch lang')}
      </button>
      <button onClick={toggleTheme}> {t('Switch theme')}</button>
      <HelloWorld />
    </header>
  );
};
