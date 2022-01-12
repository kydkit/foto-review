import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useAuthContext } from "../context/AuthContext";
import { db, storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const useUploadPic = () => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isMutating, setIsMutating] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [progress, setProgress] = useState(null);

  const { currentUser } = useAuthContext();

  const mutate = async (images, albumId) => {
    // reset internal state
    setError(null);
    setIsError(null);
    setIsSuccess(null);
    setIsMutating(true);

    //If file is not an image
    if (!images) {
      setError("That is not an image file");
      setIsError(true);
      setIsMutating(false);
      return;
    }

    images.forEach(async (image) => {
      //generate uuid for an image
      const imageId = uuidv4();

      //construct full path in storage to save image as
      const storageFullPath = `images/${image.name}`;

      try {
        //reach out to specific storage
        const storageRef = ref(storage, storageFullPath);

        //upload each image
        const uploadTask = uploadBytesResumable(storageRef, image);

        // attach upload observer
        uploadTask.on("state_changed", (uploadTaskSnapshot) => {
          // update progress
          setProgress(
            Math.round(
              (uploadTaskSnapshot.bytesTransferred /
                uploadTaskSnapshot.totalBytes) *
                1000
            ) / 10
          );
        });

        //wait for upload to be completed
        await uploadTask.then();

        //get download url
        const url = await getDownloadURL(storageRef);

        //create ref to db 'images'
        const collectionRef = collection(db, "images");

        //create doc in db for the uploaded image
        await addDoc(collectionRef, {
          created: serverTimestamp(),
          name: image.name,
          owner: currentUser.uid,
          path: storageRef.fullPath,
          size: image.size,
          type: image.type,
          imageId,
          albumId,
          url,
        });

        // success
        setProgress(null);
        setIsSuccess(true);
        setIsMutating(false);
      } catch (e) {
        setError(e.message);
        setIsError(true);
        setIsMutating(false);
        setIsSuccess(false);
      }
    });
  };

  return { error, isError, isMutating, isSuccess, mutate, progress };
};

export default useUploadPic;
