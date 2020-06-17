import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";

import { MenuList, MenuItem, List } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MaterialIcon from "./MaterialIcon";

import { drawerListStyles as useStyles } from "../../utils/makeStylers";
import { getNavLinks } from "../../utils/navUtils";

/**
 * Returns DrawerList component list of menu items to be used inside MenuDrawer component.
 * @function DrawerList
 * @param {function} setOpen - called to toggle drawer.
 * @param {bool} isAuthenticated - if user is authenticated or not.
 * @returns {div}
 */
const DrawerList = ({ setOpen, isAuthenticated }) => {
  const classes = useStyles();
  const currentPath = useLocation().pathname.slice(1);
  const history = useHistory();
  const authType = isAuthenticated ? "logout" : "login";

  const isActiveRoute = (routePath) => {
    return currentPath === routePath.slice(1);
  };

  const NavLinks = getNavLinks(isAuthenticated).map(
    ({ text, path, icon }, key) => (
      <NavLink to={path} style={{ textDecoration: "none" }} key={key}>
        <MenuItem
          selected={isActiveRoute(path)}
          classes={{ root: "MenuItem", selected: "selected" }}
        >
          <MaterialIcon type={icon} />
          <ListItemText primary={text} />
        </MenuItem>
      </NavLink>
    )
  );

  return (
    <div
      data-testid="component-drawer-list"
      className={classes.list}
      onClick={() => setOpen(false)}
    >
      <MenuList>{NavLinks}</MenuList>

      {/* STATIC MENU ITEMS */}
      <Divider />
      <List>
        <ListItem
          button
          component="a"
          href="https://github.com/zhagm/officeplace"
          target="_blank"
        >
          <MaterialIcon type="docs" />
          <ListItemText primary={"App Documentation"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          button
          data-testid="drawer-list-auth-btn"
          onClick={() => history.push(`/${authType}`)}
        >
          <MaterialIcon type={authType} />
          <ListItemText primary={isAuthenticated ? "Logout" : "Login"} />
        </ListItem>
      </List>
    </div>
  );
};

DrawerList.propTypes = {
  setOpen: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(DrawerList);
