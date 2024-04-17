import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onUserStateChanged } from '../api/firebase';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState();
  useEffect(() => {
    onUserStateChanged(setUser);
  }, []);
  setTimeout(() => {
    console.log(user);
  }, 10000);

  if (!user) {
    alert('먼저 로그인을 해 주세요.');
    return (
        <Navigate to='/' replace={true} />
    );
  }

  return children;
}