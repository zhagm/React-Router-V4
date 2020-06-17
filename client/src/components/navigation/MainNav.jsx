import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { mainNavStyles as useStyles } from "../../utils/makeStylers";

/**
 * Returns App Navigation Bar.
 * @function MainNav
 * @param {object} options - can have { transparent: true }.
 * @param {object} children - nested children of component to render in nav.
 * @returns {AppBar}
 */
const MainNav = ({ options = {}, children }) => {
  const classes = useStyles();

  return (
    <AppBar
      className={options.transparent ? classes.transparentNav : ""}
      color="primary"
    >
      <Toolbar className={classes.toolbar} data-testid="main-nav-toolbar">
        <Link to="/" className={classes.navBrand}>
          <Typography variant="h6">OfficePlace</Typography>
        </Link>
        {children}
      </Toolbar>
    </AppBar>
  );
};

MainNav.propTypes = {
  options: PropTypes.object,
};

export default MainNav;
