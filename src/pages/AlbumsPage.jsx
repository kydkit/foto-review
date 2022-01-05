import { useNavigate } from "react-router";

const AlbumsPage = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    console.log("creating album");
    navigate("/upload");
  };

  return (
    <div>
      <h1>Albums Page</h1>
      <button onClick={handleCreate}>+ Create Album</button>
    </div>
  );
};

export default AlbumsPage;
