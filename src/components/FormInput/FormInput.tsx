import React from "react";
import { Control, Controller, FieldErrorsImpl } from "react-hook-form";
import Input from "../Input/Input";

import styles from "./FormInput.module.css";

interface IFormInput {
  control: Control;
  errors: FieldErrorsImpl;
  rules: any;
  name: string;
  title?: string;
  placeholder: string;
  type?: React.HTMLInputTypeAttribute;
  rows?: number;
}

const FormInput: React.FC<IFormInput> = ({
  control,
  errors,
  rules,
  name,
  placeholder,
  title,
  type = "text",
  rows = 1,
}) => {
  return (
    <div className={styles.inputBlock}>
      {title && <div className={styles.title}>{title}</div>}
      <Controller
        control={control}
        name={name}
        rules={{ ...rules }}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <Input
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            isError={Boolean(errors[name])}
            type={type}
            rows={rows}
          />
        )}
      />
      {errors[name] && (
        <div className={styles.error}>{errors[name]?.message as string}</div>
      )}
    </div>
  );
};

export default FormInput;
