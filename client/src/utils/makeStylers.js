import { makeStyles } from "@material-ui/core/styles";

export const authPageStyles = makeStyles((theme) => ({
  slantedBottomBorder: {
    minWidth: "100vw",
    position: "absolute",
    right: "0px",
    bottom: "-5px",
  },
  fillWhite: {
    fill: "white",
  },
  splashBody: {
    color: "white",
    paddingTop: "4rem",
    [theme.breakpoints.up("sm")]: {
      margin: "0 5vw",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "0 10vw",
    },
  },
  splashContainer: {
    backgroundColor: "#000",
    backgroundImage:
      "linear-gradient(135deg, #162a4b 30%, rgba(100, 0, 200, 0.5) 100%)",
    height: "100vh",
    position: "relative",
    top: "0",
    paddingTop: "3rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  formPaper: {
    [theme.breakpoints.up("xs")]: {
      width: "90vw",
    },
    [theme.breakpoints.up("sm")]: {
      width: "350px",
    },
    padding: "7vh 0",
    display: "flex",
    alignItems: "center",
  },
  bottomLinks: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  link: {
    margin: ".8rem 1px",
    fontSize: ".8rem",
    textDecoration: "none",
    color: "white",
    userSelect: "none",
  },
}));

export const alertStyles = makeStyles((theme) => ({
  alert: {
    color: "white",
    backgroundColor: "red",
    borderRadius: "5px",
    padding: "2px 5px",
    fontWeight: "bold",
    width: "auto",
    textAlign: "center",
    marginBottom: "20px",
  },
  hide: {
    opacity: 0,
  },
}));

export const splashPageStyles = makeStyles((theme) => ({
  curvedBottomBorder: {
    minWidth: "100vw",
    position: "absolute",
    right: "0px",
    bottom: "-15px",
  },
  splashBody: {
    color: "white",
    paddingTop: "4rem",
    [theme.breakpoints.up("sm")]: {
      margin: "auto 5vw",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "auto 10vw",
    },
  },
  splashContainer: {
    backgroundColor: "#000",
    backgroundImage:
      "linear-gradient(135deg, #162a4b 30%, rgba(100, 0, 200, 0.5) 100%)",
    height: "100vh",
    position: "relative",
    top: "0",
    paddingTop: "3rem",
  },
  subHeader: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "50vw",
    },
    fontSize: "20px",
    lineHeight: "35px !important",
  },
}));

export const mainNavStyles = makeStyles((theme) => ({
  transparentNav: {
    background: "transparent",
    boxShadow: "none",
    position: "absolute",
  },
  toolbar: {
    [theme.breakpoints.up("sm")]: {
      margin: "auto 5vw",
    },
    [theme.breakpoints.up("lg")]: {
      margin: "auto 10vw",
    },
  },
  navBrand: {
    flexGrow: 1,
    color: "white",
    textDecoration: "none",
    userSelect: "none",
  },
}));

export const drawerListStyles = makeStyles({
  list: { width: 250 },
});

export const authFormStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    "& label.Mui-focused": {
      color: "#a88fc9",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#5c00d9",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#a88fc9",
      },
    },
  },
}));

export const roomCardStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    flexGrow: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  center: {
    margin: "0 auto",
  },
}));

export const deskCardStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    flexGrow: 1,
    margin: "0 auto",
    height: "100px",
    display: "flex",
    alignItems: "center",
    minHeight: "30px",
    userSelect: "none",
    transition: "background-color 500ms ease",
  },
  center: {
    margin: "0 auto",
  },
  active: {
    backgroundColor: "rgb(139, 222, 14)",
    color: "white",
    fontWeight: "bold",
  },
  online: {
    backgroundColor: " rgb(138, 222, 216)",
    color: "white",
    fontWeight: "bold",
  },
  default: {
    opacity: 0.8,
  },
}));

export const roomsPageStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgb(240, 240, 240)",
    padding: "5vh 10vw",
    minHeight: "80vh",
  },
}));

export const roomPageStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "rgb(240, 240, 240)",
    minHeight: "calc(100vh - 60px)",
    display: "flex",
  },
  body: {
    padding: "5vh 10vw",
    width: "100%",
  },
}));

export const userProfileStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    minWidth: "20vw",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  center: {
    textAlign: "center",
  },
}));
