import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom";
import style from "../css/Dropzone.module.css";
import useUploadPic from "../hooks/useUploadPic";

// import { v4 as uuidv4 } from "uuid";

const UploadDropzone = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const uploadPic = useUploadPic();
  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      return;
    }

    //generate uuid for an album
    // const albumUuid = uuidv4();

    uploadPic.mutate(acceptedFiles, id);

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
    <>
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
    </>
  );
};

export default UploadDropzone;
