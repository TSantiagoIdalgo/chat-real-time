import React from 'react';
import Style from './input.module.css';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  register: UseFormRegisterReturn;
  name: string;
  type: React.InputHTMLAttributes<HTMLInputElement>['type'];
  error?: string;
  style?: React.CSSProperties;
}

const Input = ({ register, name, type, error, style }: InputProps) => {
  return (
    <div className={Style.group}>
      <input type={type}
        {...register}
        placeholder=' '
        className={Style.input}
        style={style}
        id={name}
      />
      <label htmlFor={name} className={Style.label}>
        {name}
      </label>
      <span>{error}</span>
    </div>
  );
};

export default Input;