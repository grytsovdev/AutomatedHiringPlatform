import React from 'react';

import styles from './Checkbox.module.css';
import { FormControl, FormField, FormItem, FormLabel } from '../Form/Form';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label: string;
  checked?: boolean;
}

const Checkbox = ({ control, name, label, className, ...props }: CheckboxProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={styles.wrapper}>
          <FormControl>
            <input
              {...field}
              type='checkbox'
              className={`${styles.check} ${className}`}
              placeholder=''
              checked={field.value ?? false}
              {...props}
            />
          </FormControl>
          <FormLabel className={styles.label}>{label}</FormLabel>
        </FormItem>
      )}
    />
  );
};

export default Checkbox;
