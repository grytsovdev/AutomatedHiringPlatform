import * as yup from 'yup';

export const forgotPasswordSchema = yup
  .object()
  .shape({
    email: yup.string().email('Invalid email address').required('Email is a required field'),
  })
  .required();
