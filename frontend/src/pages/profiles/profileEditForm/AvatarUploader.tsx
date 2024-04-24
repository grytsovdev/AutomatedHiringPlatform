import React, { ChangeEvent, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import ReactSlider from 'react-slider';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import defaultAvatar from 'src/assets/icons/default-profile-avatar.svg';

interface InputProps {
  width: number;
  height: number;
  border: number;
  isShown: boolean;
  setShown: (state: boolean) => void;
  savedImage: string;
  setImage: (imageUrl: string) => void;
}

const MAX_IMAGE_SIZE = 5e6;

export const AvatarUploader = ({
  width,
  height,
  border,
  isShown,
  setShown,
  setImage,
  savedImage,
}: InputProps) => {
  const [tempImage, setTempImage] = useState<string>(savedImage || defaultAvatar);
  const imageInput = useRef<HTMLInputElement | null>(null);
  const [rangeValue, setRangeValue] = useState<number>(10);

  const avatarEditorRef = useRef<AvatarEditor | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImage = e.target.files[0];
      if (newImage.size >= MAX_IMAGE_SIZE) {
        toast({
          title: 'Image size must be less than 5MB',
          description: 'Please, choose another image less than 5mb size',
          variant: 'destructive',
        });
        return;
      }
      setTempImage(URL.createObjectURL(newImage));
    }
  };

  const onClose = () => {
    imageInput.current = null;
    setShown(false);
  };

  const handleUploadImage = () => {
    imageInput.current?.click();
  };

  const handleSave = async () => {
    console.log(tempImage);
    if (tempImage && tempImage !== defaultAvatar) {
      const url = avatarEditorRef.current?.getImageScaledToCanvas().toDataURL();
      const result = await fetch(url!);
      const blob = await result.blob();
      const image = URL.createObjectURL(blob);
      setImage(image);
    }
    setShown(false);
  };

  if (!isShown) return <></>;
  return (
    <div
      className='absolute w-full h-max py-8 2xl:h-full
       bg-grey/50 left-0 top-0 z-[9999]'
      onClick={() => setShown(false)}
    >
      <div
        onClick={e => {
          e.stopPropagation();
        }}
        className='md:relative md:w-fit mx-4 pl-8 md:ml-80 md:mt-6 md:px-20 py-10 bg-black'
      >
        <h5 className='text-white font-semibold text-2xl mb-2'>Replace profile picture</h5>
        <p className='font-semibold text-grey text-lg mb-4'>Image size must be less than 5MB</p>
        <input
          accept='image/*'
          hidden
          id='avatar-image-upload'
          type='file'
          onChange={handleImageChange}
          ref={imageInput}
        />

        <AvatarEditor
          image={tempImage}
          width={width}
          height={height}
          border={border}
          borderRadius={500}
          color={[0, 0, 0, 0.72]}
          scale={rangeValue / 10}
          ref={avatarEditorRef}
        />
        <div className='px-10'>
          <ReactSlider
            className='mt-6'
            marks
            min={1}
            max={50}
            defaultValue={rangeValue}
            onChange={value => setRangeValue(value)}
            disabled={!tempImage.includes('blob:')}
            renderThumb={(props, state) => (
              <div
                {...props}
                style={{ ...props.style, zIndex: 20 }}
                className='relative flex flex-col items-center w-6 h-6 -mt-2.5 outline-none'
              >
                <div className='w-6 h-6 bg-blue rounded-full cursor-pointer' />
              </div>
            )}
            renderTrack={(props, state) => (
              <div
                {...props}
                className={`h-1 rounded-full cursor-pointer ${
                  state.index ? 'bg-dark-grey' : 'bg-dark-blue'
                }`}
              />
            )}
          />
        </div>
        <div className='pt-6 w-fit md:ml-auto'>
          <button className='text-white py-2 px-2 rounded-md' onClick={onClose}>
            Cancel
          </button>
          <button className='text-white py-2 px-2 mx-6 rounded-md' onClick={handleUploadImage}>
            Upload image
          </button>
          <button className='text-white py-2 px-4 md:px-14 rounded-md bg-blue' onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
