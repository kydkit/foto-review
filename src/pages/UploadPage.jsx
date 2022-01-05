import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import style from "../css/Dropzone.module.css";
import useUploadPic from "../hooks/useUploadPic";

import { v4 as uuidv4 } from "uuid";

const UploadPage = () => {
  const navigate = useNavigate();
  const uploadPic = useUploadPic();
  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      return;
    }

    //generate uuid for an album
    const albumUuid = uuidv4();

    uploadPic.mutate(acceptedFiles, albumUuid);

    //nav to home or directly to album?
    // navigate(`/${albumUuid}`);
    //navigage('/')
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
    <div>
      <h1>Upload pics here</h1>
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
            <span>Drop your file(s) here</span>
          )}
        </div>
        {uploadPic.error ? <span>{uploadPic.error}</span> : ""}
      </div>
    </div>
  );
};

export default UploadPage;
