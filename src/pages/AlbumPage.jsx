import { useParams } from "react-router-dom";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import UploadDropzone from "../components/UploadDropzone";
import PhotoCard from "../components/PhotoCard";

const AlbumPage = () => {
  const { id } = useParams();

  const colPhotosRef = collection(db, "images");

  const queryKey = ["images"];

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

  return (
    <div>
      <h1>Album name: {id} </h1>
      <UploadDropzone />
      {photosQuery.data &&
        photosQuery.data.map((photo) => <PhotoCard photo={photo} />)}
    </div>
  );
};

export default AlbumPage;
