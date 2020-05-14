import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Badge, Button, Card, CardBody, Col } from "reactstrap";

const RoomCard = ({ room }) => {
  return (
    <Col lg="4" className="mb-5">
      <Card className="card-lift--hover shadow border-0 roomCard">
        <CardBody>
          <h6 className="text-default text-uppercase">{room.name}</h6>
          <div>
            <Badge color="default" className="mr-1">
              {`${room.members.length} member${
                room.members.length !== 1 ? "s" : ""
              }`}
            </Badge>
          </div>
          <p className="description mt-3">
            {room.description ? room.description : ""}
          </p>
          <Link to={`rooms/${room._id}`}>
            <Button className="mt-4" color="primary">
              Enter Room
            </Button>
          </Link>
        </CardBody>
      </Card>
    </Col>
  );
};

RoomCard.propTypes = {
  room: PropTypes.object.isRequired,
};

export default RoomCard;
