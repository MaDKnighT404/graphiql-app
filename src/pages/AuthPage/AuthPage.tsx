import { auth } from 'firebase/firebase';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { selectAuthValues } from 'redux/features/auth/authenticationSlice';
import { useAppSelector } from 'redux/hooks';
import { RegistrationModal } from 'components/Forms/RegistrationForm/RegistrationForm';
import { LoginModal } from 'components/Forms/LoginForm/LoginForm';
import styles from './AuthPage.module.scss';

export const AuthPage = () => {
  const [user, loading] = useAuthState(auth);
  const { ...state } = useAppSelector(selectAuthValues);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      navigate('/graphql');
    }
  }, [user, loading, navigate]);

  return (
    <div className={styles.authFormWrapper}>
      {state.error && (
        <div className={styles.formErrorWrapper}>
          {(() => {
            switch (state.error) {
              case 'User not found':
                return t('User not found');
              case 'Wrong password':
                return t('Wrong password');
              case 'This user already exist':
                return t('This user already exist');
              default:
                return null;
            }
          })()}
        </div>
      )}
      {state.form === 'signIn' ? <LoginModal /> : <RegistrationModal />}
    </div>
  );
};
