import { ReactNode } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface SecondaryButtonProps extends ButtonProps {
  children: ReactNode;
}

function SecondaryButton({ children, ...otherProps }: SecondaryButtonProps) {
  return (
    <Button
      style={{
        background: '#feeee6',
        color: "#f35b0c",
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

export default SecondaryButton;