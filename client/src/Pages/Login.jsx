import React, { useEffect, useState } from "react";

const UsersPage = () => {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users")
      .then((res) => setUsers(res.data));
  }, []);
  return (
    <div>
      <h1>USERS</h1>
      <ul>
        {users.map((user) => (
          <li>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
