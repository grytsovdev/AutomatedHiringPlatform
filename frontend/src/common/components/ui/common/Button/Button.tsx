import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from 'src/common/helpers/helpers';

export const buttonVariants = cva(
  'inline-flex items-center justify-center text-base relative rounded-lg cursor-pointer !leading-none disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-blue text-white hover:bg-hover active:bg-dark-blue disabled:bg-inactive',
        secondary:
          'bg-white border text-blue border-solid border-blue hover:border-hover hover:text-hover active:border-dark-blue disabled:text-inactive disabled:border-inactive',
        tertiary: 'text-blue bg-transparent disabled:text-inactive',
        message: 'bg-white text-dark-blue text-base rounded-lg shadow-md flex items-center',
        controls:
          'rounded-full bg-blue text-white hover:bg-hover active:bg-dark-blue disabled:bg-inactive',
      },
      size: {
        default: 'h-12 py-4 px-8',
        message: 'h-8	px-4 py-4',
        controls: 'h-12 w-12 p-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button: React.FC<ButtonProps> = ({ variant, size, className, children, ...props }) => {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
