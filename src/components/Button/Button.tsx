import { ButtonHTMLAttributes, ReactNode, memo } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  size?: ButtonSize;
  children?: ReactNode;
}

export enum ButtonTheme {
  CLEAR = 'clear',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline_red',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
}

export const Button = memo((props: ButtonProps) => {
  const {
    className,
    children,
    theme = ButtonTheme.OUTLINE,
    size = ButtonSize.M,
    ...otherProps
  } = props;

  return (
    <button
      type="button"
      className={classNames(styles.button, className, styles[theme], styles[size])}
      {...otherProps}
    >
      {children}
    </button>
  );
});
