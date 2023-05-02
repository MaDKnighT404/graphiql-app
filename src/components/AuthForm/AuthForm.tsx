import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
  logInWithEmailAndPassword,
  signInWithGithub,
} from '../../firebase/firebase';

import { validationSchemaSignIn, validationSchemaSignUp } from 'helpers/validationSchema';

import styles from './AuthForm.module.scss';

interface UserSubmitForm {
  name?: string;
  email: string;
  password: string;
}

export const Auth = () => {
  const [isReg, setIsReg] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<UserSubmitForm>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: isReg ? yupResolver(validationSchemaSignUp) : yupResolver(validationSchemaSignIn),
  });

  const onSubmit = async (data: FieldValues) => {
    if (!isReg) {
      await logInWithEmailAndPassword(data.email, data.password);
      navigate('/graphql');
    } else {
      await registerWithEmailAndPassword(data.name, data.email, data.password);
      navigate('/graphql');
    }
    reset();
  };

  const handleChangeForm = () => {
    setIsReg(!isReg);
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
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={styles.formTitle}>{isReg ? t('Sign up') : t('Sign in')}</h4>

        {isReg && (
          <label htmlFor="name" className={styles.formLabel}>
            {t('Fullname')}
            <input type="text" {...register('name')} id="name" />
          </label>
        )}
        {isReg && errors.name && <p className={styles.formError}>{errors.name.message}</p>}

        <label htmlFor="email" className={styles.formLabel}>
          {t('Email')}
          <input type="text" {...register('email')} id="email" />
        </label>
        {errors.email && <p className={styles.formError}>{errors.email.message}</p>}

        <label htmlFor="password" className={styles.formLabel}>
          {t('Password')}
          <input type="password" {...register('password')} id="password" />
        </label>
        {errors.password && <p className={styles.formError}>{errors.password.message}</p>}

        <button type="submit" className={styles.formSubmitBtn}>
          {isReg ? t('Create account') : t('Log in')}
        </button>

        <button onClick={handleGoogleLogin} type="button" className={styles.formSubmitBtn}>
          {t('Login with Google')}
        </button>

        <button onClick={handleGithubLogin} type="button" className={styles.formSubmitBtn}>
          {t('Login with Github')}
        </button>

        <p className={styles.formMessage}>
          {isReg ? t('Already have an account?') : t("Don't have an account?")}
          <span onClick={handleChangeForm} className={styles.formSignIn}>
            {isReg ? t('Sign in') : t('Sign up')}
          </span>
        </p>
      </form>

      {isSubmitSuccessful && (
        <div className={styles.formSumbitSuccessWrapper}>
          <div className={styles.formSumbitSuccessInner}>
            <span className={styles.formSuccessText}>User created!</span>
          </div>
        </div>
      )}
    </div>
  );
};
