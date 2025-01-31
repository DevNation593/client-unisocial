import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { clearAlert } from '../../store/slices/alertSlice';

interface AlertProps {
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ 
  variant = 'default',
  children,
  className = '' 
}) => {
  const baseStyles = 'relative w-full rounded-lg border p-4';
  const variants = {
    default: 'bg-white text-gray-900 border-gray-200',
    destructive: 'bg-red-50 text-red-900 border-red-200'
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({
  children,
  className = ''
}) => (
  <div className={`mt-2 text-sm ${className}`}>
    {children}
  </div>
);
