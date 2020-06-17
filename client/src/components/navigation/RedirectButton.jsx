import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";

/**
 * Returns button that redirects to different route.
 * @function MenuButton
 * @param {string} text - button text.
 * @param {string} to - string path of route to redirect to.
 * @param {string} color - optional color prop, defaults to 'secondary'
 * @returns {IconButton and Drawer}
 */
const MenuButton = ({ text, to: path, color = "secondary", ...props }) => {
  return (
    <Link to={path} style={{ textDecoration: "none" }}>
      <Button
        aria-controls="get-started"
        variant="contained"
        color={color}
        disableElevation
        {...props}
      >
        {text}
      </Button>
    </Link>
  );
};

MenuButton.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default MenuButton;
