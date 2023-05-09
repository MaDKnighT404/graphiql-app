import { signInWithGoogle, signInWithGithub } from 'firebase/firebase';
import { LoginModal } from './LoginForm/LoginForm';
import { RegistrationModal } from './RegistrationForm/RegistrationForm';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  changeAuthenticationForm,
  selectAuthValues,
  setError,
} from 'redux/features/auth/authenticationSlice';
import styles from './Authentication.module.scss';
import { useTranslation } from 'react-i18next';

export const Authentication = () => {
  const dispatch = useAppDispatch();
  const { ...state } = useAppSelector(selectAuthValues);
  const { t } = useTranslation();

  const handleChangeForm = () => {
    dispatch(changeAuthenticationForm());
    dispatch(setError(''));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle();
  };

  const handleGithubLogin = () => {
    signInWithGithub();
  };
  t('This user already exist');
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
      {state.isReg ? (
        <RegistrationModal handleChangeForm={handleChangeForm} />
      ) : (
        <LoginModal
          handleChangeForm={handleChangeForm}
          handleGoogleLogin={handleGoogleLogin}
          handleGithubLogin={handleGithubLogin}
        />
      )}
    </div>
  );
};
