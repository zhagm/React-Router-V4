import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getItems, addItem } from "../actions/itemActions";

const ItemsPage = ({ items, getItems, addItem }) => {
  const [newItemInput, setNewItemInput] = useState("");
  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);
  const onNewItemSubmit = (e) => {
    e.preventDefault();
    if (newItemInput) addItem({ text: newItemInput });
    setNewItemInput("");
  };

  return (
    <div>
      <h1>ITEMS</h1>
      <form onSubmit={onNewItemSubmit}>
        <label>
          Add new item:
          <input
            type="text"
            name="name"
            value={newItemInput}
            onChange={(e) => setNewItemInput(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {(items || []).map((item) => (
          <li key={item._id}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
};

ItemsPage.propTypes = {
  addItem: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.item.items,
});

export default connect(mapStateToProps, { getItems, addItem })(ItemsPage);
