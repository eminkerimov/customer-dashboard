import { ReactNode } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface MainButtonProps extends ButtonProps {
  children: ReactNode;
}

function MainButton({ children, ...otherProps }: MainButtonProps) {
  return (
    <Button
      style={{
        background: '#f35b0c',
        color: '#fff',
        fontSize: '16px',
        borderRadius: '26px',
        padding: '10px 30px',
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
}

export default MainButton;