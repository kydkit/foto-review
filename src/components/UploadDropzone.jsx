import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import style from "../css/Dropzone.module.css";

const UploadDropzone = () => {
  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      return;
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/gif, image/jpeg, image/png, image/webp",
    onDrop,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        id={style.dropzoneWrapper}
        className={`${isDragAccept ? "drag-accept" : ""}${
          isDragReject ? "drag-reject" : ""
        }`}
      >
        <input {...getInputProps()} />

        <div className={style.indicator}>
          {isDragActive ? (
            isDragAccept ? (
              <span>I like that file</span>
            ) : (
              <span>Drop an acceptable image file</span>
            )
          ) : (
            <span>Drop your files here</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadDropzone;
