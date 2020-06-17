import React from "react";
import { useLocation } from "react-router-dom";
import MainNav from "../../components/navigation/MainNav";
import { Container, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import { authPageStyles as useStyles } from "../../utils/makeStylers";
import AuthForm from "../../components/auth/AuthForm";

/**
 * Returns AuthPage component with nav and login form.
 * @function AuthPage
 * @returns {div}
 */
function AuthPage() {
  const classes = useStyles();
  const isLogin = useLocation().pathname.includes("login");

  return (
    <div data-testid="component-splash-page">
      <MainNav options={{ transparent: true }}></MainNav>
      <Container className={classes.splashContainer} maxWidth={false}>
        <div className={classes.splashBody}>
          <Paper className={classes.formPaper}>
            <AuthForm isLogin={isLogin} />
          </Paper>
          <div className={classes.bottomLinks}>
            <Link to="/" className={classes.link}>
              Forgot your password?
            </Link>
            <Link
              to={isLogin ? "/register" : "/login"}
              className={classes.link}
            >
              {isLogin ? "Create a new account" : "I already have an account!"}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AuthPage;
