import React from 'react';
import AuthWrapper from 'src/pages/authentication/AuthWrapper/AuthWrapper';
import resetImage from 'src/assets/resetimage.png';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from 'src/common/components/ui/common/Input/common/TextInput/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'src/common/components/ui/common/Button';
import { resetPasswordApi } from 'src/common/store/api/packages/reset-password/resetPasswordApi';
import { forgotPasswordSchema } from 'src/common/packages/authentication/password/types/validation-schemas/forgot-password.validation-schema';
import { useAppDispatch } from 'src/common/hooks/redux';
import { setEmail } from 'src/common/store/slices/packages/reset-password/resetPasswordSlice';

type ForgotInputs = yup.InferType<typeof forgotPasswordSchema>;

const ForgotPage = () => {
  const [forgot, { isLoading, error }] = resetPasswordApi.useLazyForgotQuery();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<ForgotInputs>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: ForgotInputs) => {
    forgot(data)
      .unwrap()
      .then(() => {
        dispatch(setEmail(data.email));
        navigate('/auth/forgot/email-sended');
      })
      .catch(() => console.log(error));
  };

  return (
    <AuthWrapper image={resetImage}>
      <div className='flex flex-col w-[450px] px-5'>
        <h1 className='xl:text-h2 text-h3 text-black font-bold mb-4'>Forgot Password</h1>

        <p className='text-body-default text-dark-grey font-semibold mb-6'>
          Send a link to your email to reset your password
        </p>

        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col items-center gap-8 [&>div]:w-full'
          >
            <TextInput control={control} name='email' label='Email' type='text' disabled={false} />

            <Button
              className='w-full'
              variant='primary'
              size='default'
              type='submit'
              disabled={isLoading}
            >
              Send reset link
            </Button>
          </form>
        </FormProvider>
      </div>
    </AuthWrapper>
  );
};

export default ForgotPage;
