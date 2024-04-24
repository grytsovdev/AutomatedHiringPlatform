import React from 'react';
import AuthWrapper from 'src/pages/authentication/AuthWrapper/AuthWrapper';
import authImage from 'src/assets/authimage.png';
import * as yup from 'yup';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from 'src/common/components/ui/common/Input/common/TextInput/TextInput';
import { PasswordInput } from 'src/common/components/ui/common/Input/common/PasswordInput/PasswordInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from 'src/common/packages/authentication/registration/types/validation-schemas/registration.validation-schema';
import { Button } from 'src/common/components/ui/common/Button';
import { ReactComponent as GoogleLogo } from 'src/assets/icons/google.svg';
import { authApi } from 'src/common/store/api/packages/authentication/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { isCompanyEmail } from 'company-email-validator';

type RegistrationInputs = yup.InferType<typeof registrationSchema>;

const SignUpPage = () => {
  const [registration, { isLoading, error }] = authApi.useRegistrationMutation();

  const navigate = useNavigate();

  const form = useForm<RegistrationInputs>({
    resolver: yupResolver(registrationSchema),
    mode: 'onTouched',
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = async (data: RegistrationInputs) => {
    const body = {
      first_name: data.fullname.split(' ')[0],
      last_name: data.fullname.split(' ')[1],
      email: data.email,
      password: data.password,
    };

    const domain = data.email.split('@')[1];
    const redirect = !isCompanyEmail(data.email)
      ? `/auth/verify-email?domain=${domain}`
      : '/auth/verify-email';

    registration(body)
      .unwrap()
      .then(() => {
        toast({
          title: 'Account created successfully!',
          description: "You're almost there. Please proceed to verify your email.",
        });
        navigate(redirect);
      })
      .catch(() => console.log(error));
  };

  const handleClick = () => {
    window.location.assign(`${process.env.REACT_APP_API_URL}/auth/google`);
  };

  return (
    <AuthWrapper
      image={authImage}
      text='Finding the right candidate has never been easier! A few clicks and the deal is ready.'
    >
      <div className='flex flex-col gap-6 w-[450px] px-5'>
        <h1 className='2xl:text-h1 xl:text-h2 text-h3 text-black font-bold mb-4'>
          Register now
          <br />
          on <span className='text-blue'>Fyrst</span>
        </h1>

        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col items-center gap-6 [&>div]:w-full'
          >
            <TextInput
              control={control}
              name='fullname'
              label='Full name'
              type='text'
              disabled={false}
            />
            <TextInput control={control} name='email' label='Email' type='text' disabled={false} />
            <PasswordInput control={control} name='password' label='Password' />
            <PasswordInput control={control} name='confirmPassword' label='Confirm password' />
            <Button className='w-full' type='submit' disabled={isLoading}>
              Sign up
            </Button>
          </form>
        </FormProvider>
        <Button
          variant='tertiary'
          className='w-full flex items-center gap-2'
          type='button'
          onClick={handleClick}
        >
          <GoogleLogo />
          Sign up with Google
        </Button>
        <p className='text-body-default text-dark-grey font-semibold'>
          Already have an account?{' '}
          <a href='./signin' className='decoration-transparent text-blue hover:cursor-pointer'>
            Sign in now.
          </a>
        </p>
      </div>
    </AuthWrapper>
  );
};

export default SignUpPage;
