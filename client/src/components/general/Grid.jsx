import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

/**
 * Returns grid of items passed in as props.
 * @function CenteredGrid
 * @param {object} itemProps - object of props to pass into each <Grid item />
 * @param {array} items - array of React components to render in grid.
 * @returns {div}
 */
const CenteredGrid = ({ itemProps = { xs: 12, sm: 6, md: 4 }, items = [] }) => (
  <div>
    <Grid container spacing={3}>
      {items.map((Item, i) => (
        <Grid item key={i} {...itemProps}>
          {Item}
        </Grid>
      ))}
    </Grid>
  </div>
);

CenteredGrid.propTypes = {
  items: PropTypes.array.isRequired,
  itemProps: PropTypes.object,
};

export default CenteredGrid;
