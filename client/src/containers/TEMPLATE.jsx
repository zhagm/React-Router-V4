import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Template = () => {
  return (
    <div>
      <h1>TEMPLATE</h1>
    </div>
  );
};

Template.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { getLogin })(Template);
