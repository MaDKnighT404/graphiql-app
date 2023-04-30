import React, { InputHTMLAttributes, memo, useEffect, useRef } from 'react';

import styles from './Input.module.scss';
import classNames from 'classnames';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  label?: string;
}

export const Input = memo((props: InputProps) => {
  const { className, value, onChange, type = 'text', label, autofocus, id, ...otherProps } = props;

  const ref = useRef<HTMLInputElement>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  useEffect(() => {
    if (autofocus) {
      ref.current?.focus();
    }
  }, [autofocus]);

  console.log(label, id);

  return (
    <div className={classNames(styles.inputWrapper, {}, [className])}>
      {label && id && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        value={value}
        onChange={changeHandler}
        className={classNames(styles.input)}
        {...otherProps}
      />
    </div>
  );
});
