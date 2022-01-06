import { Card } from "react-bootstrap";
import cardStyle from "../css/Card.module.css";

const PhotoCard = ({ photo }) => {
  return (
    <Card className={cardStyle.cards}>
      <img src={photo.url} alt="" />{" "}
    </Card>
  );
};

export default PhotoCard;
