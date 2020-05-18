import React from "react";
import PropTypes from "prop-types";
import classnames from "../utils/classnames";

const UsersTable = ({ users = [], onlineUsers = [] }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td
              className={classnames("status", {
                online: onlineUsers.includes(user._id),
              })}
            >
              •
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array,
  onlineUsers: PropTypes.array,
};

export default UsersTable;
