import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { FieldValues, useForm } from 'react-hook-form';
import { validationSchemaSignUp } from 'helpers/validationSchema';
import { registerWithEmailAndPassword } from 'firebase/firebase';
import { Loader } from 'components/Loader/Loader';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectAuthValues, setError } from 'redux/features/auth/authenticationSlice';
import styles from '../Authentication.module.scss';

interface RegistrationFormValue {
  name: string;
  email: string;
  password: string;
}

interface FormProps {
  handleGoogleLogin: () => void;
  handleGithubLogin: () => void;
  handleChangeForm: () => void;
}

export const RegistrationModal: React.FC<FormProps> = ({
  handleGoogleLogin,
  handleGithubLogin,
  handleChangeForm,
}) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { ...state } = useAppSelector(selectAuthValues);

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

    await registerWithEmailAndPassword(data.name, data.email, data.password).catch((err) => {
      if (err.code === 'auth/email-already-in-use') {
        dispatch(setError('User already exist'));
      }
    });
    reset();
    setLoading(false);
    navigate('/graphql');
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
      <h4 className={styles.formTitle}>{t('Sign up')}</h4>

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
        {t('Create account')}
      </button>

      <p className={styles.formMessage}>
        <span>{t('Already have an account?')}</span>
        <span onClick={handleChangeForm} className={styles.formSignIn}>
          {t('Sign in')}
        </span>
      </p>
      {state.error && <span>{t('This user already exist')}</span>}
      {loading && <Loader />}
    </form>
  );
};
