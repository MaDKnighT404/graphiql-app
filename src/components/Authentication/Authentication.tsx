import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ...state } = useAppSelector(selectAuthValues);

  const handleChangeForm = () => {
    dispatch(changeAuthenticationForm());
    dispatch(setError(''));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle();
    navigate('/graphql');
  };

  const handleGithubLogin = () => {
    signInWithGithub();
    navigate('/graphql');
  };

  return (
    <div className={styles.authFormWrapper}>
      {state.isReg ? (
        <RegistrationModal
          handleChangeForm={handleChangeForm}
          handleGoogleLogin={handleGoogleLogin}
          handleGithubLogin={handleGithubLogin}
        />
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
