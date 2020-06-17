import React from "react";
import { Paper } from "@material-ui/core";

import { alertStyles as useStyles } from "../../utils/makeStylers";

/**
 * Returns red alert with message if not hidden and message exists.
 * @function Alert
 * @param {bool} hide - if true, hide alert.
 * @param {string} message - alert message.
 * @returns {Alert}
 */
function Alert({ hide, message = "" }) {
  const classes = useStyles();

  return (
    <Paper className={hide ? classes.hide : classes.alert} elevation={0}>
      {message}
    </Paper>
  );
}

export default Alert;
