import React, { useEffect, useState } from "react";
import { getUserList } from '../../api/firebase';

export default function UserList() {
  const [users, setUsers] = useState();
  useEffect(() => {
    getUserList()
      .then(setUsers);
  }, []);

  return (
    <>
      {users && users.length}
    </>
  )
}