import React from "react";

import styles from "./FileUpload.module.css";

import { ReactComponent as IconEditWhite } from "../../assets/icons/IconEditWhite.svg";
import classNames from "classnames";

interface FileUploadProps {
  setFile: Function;
  accept: string;
  path?: string;
  children?: React.ReactNode;
}

const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  children,
  path = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf8NT9z0NaWgWZ_vw7XyP7rFNu8ZHvdcHqRHqWx9OVaTxfgGjm9_E8IpsWEFOgOQGTxPw&usqp=CAU",
}) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [fileUrl, setFileUrl] = React.useState(path);

  const [hover, setHover] = React.useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
    setFileUrl(URL.createObjectURL(e.target.files![0]));
  };

  return (
    <div onClick={() => ref.current.click()} className={styles.wrapper}>
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={ref}
        onChange={onChange}
      />
      <img
        src={fileUrl}
        alt="Фото блюда"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={classNames(styles.img, {
          [styles.hovered]: hover,
        })}
      />
      {children}
      <IconEditWhite
        className={classNames(styles.icon, {
          [styles.invisible]: !hover,
        })}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    </div>
  );
};

export default FileUpload;
