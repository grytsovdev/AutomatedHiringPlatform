import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Button } from 'src/common/components/ui/common/Button';
import { bookingSchema } from 'src/common/packages/booking/types/validation-schemas/booking.validation-schema';
import { useFetchFacilitiesQuery } from 'src/common/store/api/packages/facility/facilityApi';
import {
  Form,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
  FormControl,
} from 'src/common/components/ui/common/Form/Form';
import TextInput from 'src/common/components/ui/common/Input/common/TextInput/TextInput';
import { Dropdown } from 'src/common/components/ui/common/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import { RootState } from 'src/common/store';
import { Textarea } from 'src/common/components/ui/common/Textarea/Textarea';

export type CreateBookingFormValues = y.InferType<typeof bookingSchema>;

export function CreateBookingForm({
  handleSubmit,
}: {
  handleSubmit: (values: CreateBookingFormValues) => void;
}) {
  const user = useSelector((state: RootState) => state.user);

  const form = useForm<CreateBookingFormValues>({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      status: 'pending',
      numberOfPositions: 1,
      facilitiesRate: 1,
      createdBy: user.id,
      sex: 'Male',
      age: 18,
      education: 'School',
      workingHours: 1,
      notes: '',
      positionsAvailable: 1,
      facilityId: 1,
      pricePerHour: 1,
      startDate: new Date(),
      endDate: new Date(),
    },
  });
  const onSubmit = (values: CreateBookingFormValues) => {
    const trimmedValues = {
      ...values,
      //  employersName: values.employersName.trim(),
      notes: values.notes ? values.notes.trim() : ' ',
    };

    handleSubmit(trimmedValues);
  };

  const { data: facilities } = useFetchFacilitiesQuery({});
  const options = facilities
    ? facilities.map(facility => ({
        label: facility.name,
        value: facility.id,
      }))
    : [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6' noValidate>
        <TextInput name='position' control={form.control} label={`Position`} type='text' />
        <TextInput name='companyName' control={form.control} label={`Company name`} type='text' />
        <TextInput name='skills' control={form.control} label='Skills' type='text' min={1} />
        <Dropdown
          name='experience'
          control={form.control}
          label='Work experience'
          options={[
            { label: 'No experience', value: 0 },
            { label: '1 year', value: 1 },
            { label: '2 years', value: 2 },
            { label: '3 years', value: 3 },
            { label: '4 years', value: 4 },
            { label: '5 years', value: 5 },
          ]}
          styleVariant='borders'
          placeholder='Work experience'
        />
        <Dropdown
          name='englishLevel'
          control={form.control}
          label='Level of english'
          options={[
            { label: 'No English', value: 'No English' },
            { label: 'Beginner', value: 'Beginner' },
            { label: 'Pre Intermediate', value: 'Pre Intermediate' },
            { label: 'Intermediate', value: 'Intermediate' },
            { label: 'Upper Intermediate', value: 'Upper Intermediate' },
            { label: 'Advanced', value: 'Advanced' },
            { label: 'Proficient', value: 'Proficient' },
          ]}
          styleVariant='borders'
          placeholder='Level of english'
        />
        <Dropdown
          name='education'
          control={form.control}
          label='Degree'
          options={[
            { label: 'No degree', value: 'No degree' },
            { label: 'Bachelor`s degree ', value: 'Bachelor`s degree' },
            { label: 'Master`s degree', value: 'Master`s degree' },
            { label: 'Doctoral degree', value: 'Doctoral degree' },
          ]}
          styleVariant='borders'
          placeholder='Level of english'
        />

        <FormField
          control={form.control}
          name='notes'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className={form.formState.errors.notes ? 'border-red' : ' '}
                  {...field}
                  placeholder='Job description'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' variant='primary'>
          Submit
        </Button>
      </form>
    </Form>
  );
}
