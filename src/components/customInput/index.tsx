import { TextField } from "@mui/material";
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { Register } from "../../types/types";

interface CustomInputProps {
  name: string;
  label: string;
  type: string;
  register: UseFormRegister<Register>;
  error: FieldError | undefined;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  register,
  error,
  name,
}) => {
  return (
    <div>
      <TextField
        label={label}
        type={type}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        {...register(name)}
        fullWidth
        variant="outlined"
        error={!!error}
        helperText={error?.message}
        InputLabelProps={{ shrink: true }}
        style={{ marginBottom: "8px" }}
      />
    </div>
  );
};

export default CustomInput;
