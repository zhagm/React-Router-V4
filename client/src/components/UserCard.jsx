import React from "react";
import PropTypes from "prop-types";
import { Badge, Card, CardBody, Col } from "reactstrap";
import classnames from "../utils/classnames";

const UserCard = ({ user, isActive, isOnline }) => {
  const getStatuscolor = () => {
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
            className={classnames("text-uppercase text-center", {
              online: isOnline || isActive,
              default: !isOnline && !isActive,
            })}
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
  isActive: PropTypes.bool,
  isOnline: PropTypes.bool,
};

export default UserCard;
