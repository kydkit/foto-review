import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../context/AuthContext";

const useAlbums = (params = {}) => {
  const { currentUser } = useAuthContext();

  //reaching out to albums collection in the db
  const colPhotosRef = collection(db, "albums");

  const queryKey = params.fetchOnlyCurrentUser
    ? ["albums", currentUser.uid]
    : ["albums"];

  // query for data under specific owner id
  const queryRef = params.fetchOnlyCurrentUser
    ? query(
        colPhotosRef,
        where("owner", "==", currentUser.uid),
        orderBy("created", "desc")
      )
    : query(colPhotosRef, orderBy("created", "desc"));

  const albumsQuery = useFirestoreQueryData(
    queryKey,
    queryRef,
    {
      idField: "_id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );

  return albumsQuery;
};

export default useAlbums;
