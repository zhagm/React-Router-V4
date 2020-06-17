import React from "react";
import PropTypes from "prop-types";
import { Card } from "@material-ui/core";
import { deskCardStyles as useStyles } from "../../utils/makeStylers";

/**
 * Returns card item with data of room object passed.
 * @function DeskCard
 * @param {object} user - user object to display data of.
 * @param {string} status - can be "default", "active", or "online".
 * @returns {div}
 */
const DeskCard = ({ user, status = "default" }) => {
  const classes = useStyles();

  return (
    <Card className={`easeBackgroundColor ${classes.root} ${classes[status]}`}>
      <span className={classes.center}>{user.name}</span>
    </Card>
  );
};

DeskCard.propTypes = {
  user: PropTypes.object.isRequired,
  status: PropTypes.string,
};

export default DeskCard;
