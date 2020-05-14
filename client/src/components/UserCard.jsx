import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Badge, Button, Card, CardBody, Col } from "reactstrap";

const UserCard = ({ user, isOnline, isActive }) => {
  const getStatuscolor = (active, online) => {
    const colors = {
      active: "success",
      online: "warning",
      other: "secondary",
    };
    if (isActive) return colors["active"];
    if (isOnline) return colors["online"];
    return colors["other"];
  };
  return (
    <Col lg="4" className="mb-5">
      <Card className={`shadow border-0 bg-${getStatuscolor()}  userCard`}>
        <CardBody>
          <h6
            className={`text-uppercase text-center ${
              isOnline || isActive ? "online" : "default"
            }`}
          >
            {user.name}
          </h6>
          <div>
            <Badge color="default" className="mr-1"></Badge>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserCard;
