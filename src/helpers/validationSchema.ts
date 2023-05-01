import * as yup from 'yup';

export const validationSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('Please enter your email')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Password must be at least 6 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
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
