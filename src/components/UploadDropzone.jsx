import React from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import style from "../css/Dropzone.module.css";
import useUploadPic from "../hooks/useUploadPic";

const UploadDropzone = () => {
  const { id } = useParams();
  const uploadPic = useUploadPic();
  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      return;
    }

    uploadPic.mutate(acceptedFiles, id);

    // eslint-disable-next-line
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
    <>
      <div
        {...getRootProps()}
        id={style.dropzoneWrapper}
        className={`${isDragAccept ? style.dragAccept : ""}${
          isDragReject ? style.dragReject : ""
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
            <span>Drop your file(s) here to upload</span>
          )}
        </div>

        {uploadPic.error && <span>{uploadPic.error}</span>}
        {uploadPic.isSuccess && <span>Thanks for the file(s)!</span>}
      </div>
    </>
  );
};

export default UploadDropzone;
