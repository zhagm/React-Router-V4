import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersPage = () => {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3030/api/users")
      .then((res) => setUsers(res.data));
  }, []);
  return (
    <div>
      <h1>USERS</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
