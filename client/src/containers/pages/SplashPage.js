import React from "react";
import { Container } from "@material-ui/core";
import MenuButton from "../../components/navigation/RedirectButton";
import MainNav from "../../components/navigation/MainNav";
import MenuDrawer from "../../components/navigation/MenuDrawer";
import { splashPageStyles as useStyles } from "../../utils/makeStylers";

/**
 * Returns splash page div with navigation, title, and app desc.
 * @function SplashPage
 * @returns {div}
 */
function SplashPage() {
  const classes = useStyles();
  return (
    <div data-testid="component-splash-page">
      <MainNav options={{ transparent: true }}>
        <MenuDrawer />
      </MainNav>
      <Container className={classes.splashContainer} maxWidth={false}>
        <div className={classes.splashBody}>
          <h1>OfficePlace</h1>
          <p className={classes.subHeader}>
            OfficePlace creates a virtual open office space for your team,
            closing the distance between remote coworkers so that even when
            you’re working on your own you’re working together.
          </p>
          <MenuButton
            aria-controls="get-started"
            variant="contained"
            color="secondary"
            text="GET STARTED"
            to="/register"
          />
        </div>
        <div className={classes.curvedBottomBorder}>
          <svg viewBox="0 0 140 17.5" preserveAspectRatio="none" fill="white">
            <path d="M145,17H0V0H145ZM0,0S33,17,72,7,145,0,170,0"></path>
          </svg>
        </div>
      </Container>
    </div>
  );
}

export default SplashPage;
