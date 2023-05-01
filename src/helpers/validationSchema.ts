import * as yup from 'yup';

export const validationSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('Please enter your email')
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email'),
  })
  .required();
