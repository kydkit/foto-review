import { useParams } from "react-router-dom";
//fire
import { db } from "../firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

const useImages = () => {
  const { id } = useParams();
  //reach out to images collection on the db
  const colPhotosRef = collection(db, "images");

  const queryKey = id ? ["images", id] : ["images"];

  //query specific albumId
  const queryAlbumRef = query(
    colPhotosRef,
    where("albumId", "==", id),
    orderBy("created", "desc")
  );

  const photosQuery = useFirestoreQueryData(
    queryKey,
    queryAlbumRef,
    {
      idField: "_id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );

  return photosQuery;
};

export default useImages;
