import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";

import { logout } from "../../actions/authActions";
import classnames from "../../utils/classnames";

import "../../styles/CollapseNav.scss";

import { NavItem } from "reactstrap";

const CollapseNav = ({
  links = [
    { url: "/dashboard", name: "Dashboard", private: true },
    { url: "/logout", name: "Logout", private: false },
  ],
}) => {
  const location = useLocation();
  const [toggled, setToggled] = useState(true);

  return (
    <>
      <div
        className={classnames("nav-icon", { active: !toggled })}
        onClick={() => setToggled(!toggled)}
      >
        <div></div>
      </div>
      <div className={classnames("collapsedNav", { active: !toggled })}>
        {links.map(({ url, name }, key) => (
          <NavItem key={key}>
            <Link
              className={classnames("NavLink", {
                active: location.pathname.toLowerCase() === url.toLowerCase(),
              })}
              to={url}
            >
              {name}
            </Link>
          </NavItem>
        ))}
      </div>
    </>
  );
};

CollapseNav.propTypes = {
  isAuthenticated: PropTypes.bool,
  links: PropTypes.array,
  logout: PropTypes.func,
};

export default connect(null, { logout })(CollapseNav);
