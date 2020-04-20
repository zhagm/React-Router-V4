import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getItems } from "../actions/itemActions";

const ItemsPage = ({ items, getItems }) => {
  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1>ITEMS</h1>
      <ul>
        {(items || []).map((item) => (
          <li key={item._id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};

ItemsPage.propTypes = {
  getItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.item.items,
});

export default connect(mapStateToProps, { getItems })(ItemsPage);
