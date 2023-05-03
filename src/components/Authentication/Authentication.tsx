import { signInWithGoogle, signInWithGithub } from '../../firebase/firebase';
import { RegistrationModal } from './RegistrationForm/RegistrationForm';
import { LoginModal } from './LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';
import styles from './Authentication.module.scss';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import {
  changeAuthenticationForm,
  selectAuthValues,
} from 'redux/features/auth/authenticationSlice';

export const Authentication = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { ...state } = useAppSelector(selectAuthValues);

  const handleChangeForm = () => {
    dispatch(changeAuthenticationForm());
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
