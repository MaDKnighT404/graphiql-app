import * as yup from 'yup';

export const validationSchemaSignUp = yup
  .object()
  .shape({
    name: yup
      .string()
      .required('Please enter your name')
      .matches(
        /^([А-ЯЁ][а-яё]{2,}|[A-Z][a-z]{2,})\s([А-ЯЁ][а-яё]{2,}|[A-Z][a-z]{2,})$/,
        'Enter a valid name'
      ),
    email: yup
      .string()
      .required('Please enter your email')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one digit')
      .test(
        'contains-one-special-character',
        'Password must contain at least one special character',
        (value) => {
          if (value) {
            return /[!@#$%^&*(),.?":{}|<>]/.test(value);
          }
          return true;
        }
      ),
  })
  .required();

export const validationSchemaSignIn = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('Please enter your email')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email'),
    password: yup.string().required('Please enter your password'),
  })
  .required();
