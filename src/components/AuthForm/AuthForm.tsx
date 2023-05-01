import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

import { auth, registerWithEmailAndPassword, signInWithGoogle } from '../../firebase/firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

import { validationSchema } from 'helpers/validationSchema';

import styles from './AuthForm.module.scss';

interface UserSubmitForm {
  name: string;
  email: string;
  password: string;
}

export const Auth = () => {
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
    resolver: yupResolver(validationSchema),
  });
  console.log(errors);
  const onSubmit = (data: FieldValues) => {
    registerWithEmailAndPassword(data.name, data.email, data.password);
    reset();
  };
  return (
    <div className={styles.authFormWrapper}>
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={styles.formTitle}>{t('Registration')}</h4>
        <label htmlFor="name" className={styles.formLabel}>
          {t('Fullname')}
          <input type="text" {...register('name')} id="name" />
        </label>
        {errors.name && <p className={styles.formError}>{errors.name.message}</p>}
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
          {t('Submit')}
        </button>
        <p className={styles.formMessage}>
          {t('Already have an account?')}
          <span className={styles.formSignIn}>{t('Sign in')}</span>
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
