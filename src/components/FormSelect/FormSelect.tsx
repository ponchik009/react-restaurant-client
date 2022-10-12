import React from "react";
import { Control, Controller, FieldErrorsImpl } from "react-hook-form";
import Select from "react-select";

import styles from "./FormSelect.module.css";

export interface IOption {
  label: string;
  value: number | string;
}

interface IFormSelect {
  control: Control;
  errors: FieldErrorsImpl;
  rules: any;
  name: string;
  title?: string;
  placeholder: string;
  options: IOption[];
}

const FormSelect: React.FC<IFormSelect> = ({
  control,
  errors,
  rules,
  name,
  title,
  placeholder,
  options,
}) => {
  return (
    <div className={styles.inputBlock}>
      <div className={styles.title}>{title}</div>
      <Controller
        control={control}
        name={name}
        rules={{ ...rules }}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <Select
            onChange={onChange}
            value={value}
            options={options}
            placeholder={placeholder}
            isSearchable={false}
          />
        )}
      />
      {errors[name] && (
        <div className={styles.error}>{errors[name]?.message as string}</div>
      )}
    </div>
  );
};

export default FormSelect;
