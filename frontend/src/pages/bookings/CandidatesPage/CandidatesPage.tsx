import React from 'react';
import { Card } from 'src/common/components/ui/common/Card/Card';

export const CanditatesPage = () => {
  return (
    <div>
      <h5 className='text-2xl leading-6 font-semibold text-dark-grey mb-6'>Candidates</h5>
      <div>
        <Card className='flex justify-between mb-6'>
          <p className='text-body-large text-black'>John Perry</p>
          <div className='flex'>
            <p className='mr-14 text-start w-42'>
              CV: <a className='text-blue underline cursor-pointer'>John_Perry_CV.pfd</a>
            </p>
            <p className='text-green-2'>95% suitable</p>
          </div>
        </Card>
        <Card className='flex justify-between mb-6'>
          <p className='text-body-large text-black'>Kayla Shaw</p>
          <div className='flex justify-between'>
            <p className='mr-14 text-start w-42'>
              CV: <a className='text-blue underline cursor-pointer'>Kayla_Shaw_CV.pfd</a>
            </p>
            <p className='text-orange'>60% suitable</p>
          </div>
        </Card>
        <Card className='flex justify-between mb-6'>
          <p className='text-body-large text-black'>Jane_Curtis</p>
          <div className='flex justify-between'>
            <p className='mr-14 text-start w-42'>
              CV: <a className='text-blue underline cursor-pointer'>Jane_Curtis_CV.pfd</a>
            </p>
            <p className='text-red-2'>35% suitable</p>
          </div>
        </Card>
        <Card className='flex justify-between mb-6'>
          <p className='text-body-large text-black'>Shirley Collins</p>
          <div className='flex justify-between'>
            <p className='mr-14 text-start w-42'>
              CV: <a className='text-blue underline cursor-pointer'>Shirley_Collins_CV.pfd</a>
            </p>
            <p className='text-red'>5% suitable</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
