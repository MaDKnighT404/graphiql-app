import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { FieldValues, useForm } from 'react-hook-form';
import { validationSchemaSignIn } from 'helpers/validationSchema';
import { auth, signInWithGithub, signInWithGoogle } from 'firebase/firebase';
import { Loader } from 'components/Loader/Loader';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAppDispatch } from 'redux/hooks';
import { setError } from 'redux/features/auth/authenticationSlice';
import styles from '../Forms.module.scss';

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginModal = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleGoogleLogin = () => {
    signInWithGoogle();
  };

  const handleGithubLogin = () => {
    signInWithGithub();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchemaSignIn),
  });

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, data.email, data.password).catch((err) => {
      dispatch(setError(''));
      setTimeout(() => {
        if (err.code === 'auth/user-not-found') {
          dispatch(setError('User not found'));
        } else if (err.code === 'auth/wrong-password') {
          dispatch(setError('Wrong password'));
        }
      });
    });

    reset();
    setLoading(false);
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
      <h4 className={styles.formTitle}>{t('Login')}</h4>

      <label htmlFor="email" className={styles.formLabel}>
        {t('Email')}
        <input type="text" {...register('email')} id="email" className={styles.formInput} />
      </label>
      {errors.email && <p className={styles.formError}>{errors.email.message}</p>}

      <label htmlFor="password" className={styles.formLabel}>
        {t('Password')}
        <input
          type="password"
          {...register('password')}
          id="password"
          className={styles.formInput}
          autoComplete="current-password"
        />
      </label>
      {errors.password && <p className={styles.formError}>{errors.password.message}</p>}

      <button type="submit" className={styles.formSubmitBtn}>
        {t('Log in')}
      </button>

      <button onClick={handleGoogleLogin} type="button" className={styles.formSubmitBtn}>
        {t('Login with Google')}
      </button>

      <button onClick={handleGithubLogin} type="button" className={styles.formSubmitBtn}>
        {t('Login with Github')}
      </button>

      {loading && <Loader />}
    </form>
  );
};
