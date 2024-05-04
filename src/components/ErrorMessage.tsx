

import  { ReactNode } from 'react';

type ErrorMessageProps = {
  children: ReactNode;
};

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <div className='text-center my4 bg-red-600 text-white font-bold p-3 uppercase'>
      {children}
    </div>
  );
}
