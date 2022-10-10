import React from "react";
import { Control, Controller, FieldErrorsImpl } from "react-hook-form";

import styles from "./FormCheckbox.module.css";

interface IFormCheckbox {
  control: Control;
  errors: FieldErrorsImpl;
  rules: any;
  name: string;
  title?: string;
}

const FormCheckbox: React.FC<IFormCheckbox> = ({
  control,
  errors,
  rules,
  name,
  title,
}) => {
  return (
    <div className={styles.inputBlock}>
      <Controller
        control={control}
        name={name}
        rules={{ ...rules }}
        render={({ field: { onChange, onBlur, value, name, ref } }) => (
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              value={value}
              checked={value}
              onChange={onChange}
            />
            {title}
          </label>
        )}
      />
      {errors[name] && (
        <div className={styles.error}>{errors[name]?.message as string}</div>
      )}
    </div>
  );
};

export default FormCheckbox;
