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

export const Authentication = () => {
  const dispatch = useAppDispatch();
  const { ...state } = useAppSelector(selectAuthValues);

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

  return (
    <div className={styles.authFormWrapper}>
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
