// PDFFileInput.tsx
import React, { ChangeEvent, useState } from 'react';
import PDFViewer from './PDFViewer';
import { Button } from '../Button';

interface Props {
  handleClick: () => void;
}

const PDFFileInput: React.FC<Props> = ({ handleClick }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      // Handle invalid file type
      alert('Please choose a valid PDF file.');
    }
  };

  return (
    <div className='flex'>
      <input
        type='file'
        accept='.pdf'
        onChange={handleFileChange}
        className='w-[0.1px] h-[0.1px] opacity-0 overflow-hidden absolute z-[-1]'
        name='file'
        id='file'
      />
      <label
        htmlFor='file'
        className='border-transparent shadow-dropdown  px-2.5 pb-2 pt-5 rounded-lg 
        outline-none cursor-pointer border-grey border text-sm leading-4 font-medium text-blue w-full mr-4'
      >
        {selectedFile ? `${selectedFile.name}` : 'Choose File'}
      </label>
      <Button onClick={handleClick}>Upload CV</Button>
    </div>
  );
};

export default PDFFileInput;
