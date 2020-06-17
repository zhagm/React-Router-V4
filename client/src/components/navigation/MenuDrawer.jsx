import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import { IconButton, Drawer } from "@material-ui/core";
import DrawerList from "./DrawerList";

/**
 * Returns Menu burger icon and drawer that is triggered by icon.
 * @function MenuDrawer
 * @returns {IconButton and Drawer}
 */
const MenuDrawer = () => {
  const [drawerState, setDrawerState] = React.useState(false);

  return (
    <React.Fragment>
      <IconButton
        color="inherit"
        aria-label="menu"
        role="toggle-menu-drawer"
        onClick={() => setDrawerState(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={"right"}
        open={drawerState}
        onClose={() => setDrawerState(false)}
        transitionDuration={{ enter: 500, exit: 200 }}
        data-testid={"component-menu-drawer"}
      >
        <DrawerList setOpen={setDrawerState} />
      </Drawer>
    </React.Fragment>
  );
};

export default MenuDrawer;
