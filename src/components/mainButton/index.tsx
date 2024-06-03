import { ReactNode } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface MainButtonProps extends ButtonProps {
  children: ReactNode;
}

function MainButton({ children, disabled, ...otherProps }: MainButtonProps) {
  const buttonStyles = {
    background: disabled ? '#ccc' : '#f35b0c',
    color: '#fff',
    fontSize: '16px',
    borderRadius: '26px',
    padding: '10px 30px',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  return (
    <Button
      style={buttonStyles}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </Button>
  );
}

export default MainButton;