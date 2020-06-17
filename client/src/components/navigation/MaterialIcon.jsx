import React from "react";
import PropTypes from "prop-types";

/* MATERIAL UI ICONS */
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import DescriptionIcon from "@material-ui/icons/Description";
import LockOpenIcon from "@material-ui/icons/LockOpen";

/**
 * Returns MaterialUI <ListItemIcon> component with icon from type.
 * @function MaterialIcon
 * @param {string} type - link type to find icon for (arbitrary types I made).
 * @returns {ListItemIcon}
 */
const MaterialIcon = ({ type }) => {
  let Icon;
  switch (type) {
    case "home":
      Icon = <HomeIcon />;
      break;
    case "profile":
      Icon = <AccountCircleIcon />;
      break;
    case "rooms":
      Icon = <SupervisedUserCircleIcon />;
      break;
    case "docs":
      Icon = <DescriptionIcon />;
      break;
    case "logout":
      Icon = <ExitToAppIcon />;
      break;
    case "login":
      Icon = <LockOpenIcon />;
      break;
    default:
      Icon = null;
  }
  return <ListItemIcon>{Icon}</ListItemIcon>;
};

MaterialIcon.propTypes = {
  name: PropTypes.string,
};

export default MaterialIcon;
