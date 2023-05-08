import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { FieldValues, useForm } from 'react-hook-form';
import { validationSchemaSignUp } from 'helpers/validationSchema';
import { registerWithEmailAndPassword } from 'firebase/firebase';
import { Loader } from 'components/Loader/Loader';
import { useAppDispatch } from 'redux/hooks';
import { setError, setUserName } from 'redux/features/auth/authenticationSlice';
import styles from '../Authentication.module.scss';

interface RegistrationFormValue {
  name: string;
  email: string;
  password: string;
}

interface FormProps {
  handleChangeForm: () => void;
}

export const RegistrationModal: React.FC<FormProps> = ({ handleChangeForm }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormValue>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(validationSchemaSignUp),
  });

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);

    await registerWithEmailAndPassword(data.name, data.email, data.password)
      .then(() => {
        dispatch(setUserName(data.name));
      })
      .catch((err) => {
        dispatch(setError(''));
        setTimeout(() => {
          if (err.code === 'auth/email-already-in-use') {
            dispatch(setError('This user already exist'));
          }
        });
      });

    reset();
    setLoading(false);
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
      <h4 className={styles.formTitle}>{t('Sign up')}</h4>

      <label htmlFor="name" className={styles.formLabel}>
        {t('Fullname')}
        <input
          type="text"
          {...register('name')}
          id="name"
          className={styles.formInput}
          title={t('Name and surname') || undefined}
        />
      </label>
      {errors.name && <p className={styles.formError}>{errors.name.message}</p>}

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
        {t('Create account')}
      </button>

      <p className={styles.formMessage}>
        <span>{t('Already have an account?')}</span>
        <span onClick={handleChangeForm} className={styles.formSignIn}>
          {t('Sign in')}
        </span>
      </p>
      {loading && <Loader />}
    </form>
  );
};
