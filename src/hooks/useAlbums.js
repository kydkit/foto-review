import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";

const useAlbums = () => {
  const { currentUser } = useAuthContext();

  //reaching out to albums collection in the db
  const colPhotosRef = collection(db, "albums");

  const queryKey = ["albums"];

  // query for data under specific owner id
  const queryRef = query(
    colPhotosRef,
    where("owner", "==", currentUser.uid),
    orderBy("created", "desc")
  );

  const albumsQuery = useFirestoreQueryData(queryKey, queryRef, {
    idField: "_id",
  });

  //query specific albumId
  // const queryAlbumRef = query(
  //   colPhotosRef,
  //   where("albumId", "==", albumId),
  //   orderBy("created", "desc")
  // );

  // const photosQuery = useFirestoreQueryData(queryKey, queryAlbumRef, {
  //   idField: "_id",
  // });

  //getting all albums id and using set to not get repeated ones
  // const albumRef = [
  //   ...new Set(
  //     allPhotosQuery.data && allPhotosQuery.data.map((photo) => photo.albumId)
  //   ),
  // ];

  return albumsQuery;
};

export default useAlbums;
