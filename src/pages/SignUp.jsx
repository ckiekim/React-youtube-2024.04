import React, { useState } from "react";
import { register, loginWithGithub } from '../api/firebase';

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({email:'', password:''});
  const [user, setUser] = useState();
  const handleChange = e => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }
  const handleSubmit = e => {
    e.preventDefault();
    register(userInfo).then(setUser);
  }
  const handleGithub = e => {
    loginWithGithub().then(setUser);
  }

  return (
    <div style={{margin: '20px'}}>
      <form onSubmit={handleSubmit}>
        <input type="email" name='email' value={userInfo.email} placeholder="이메일"
          onChange={handleChange} /><br />
        <input type="password" name='password' value={userInfo.password} placeholder="패스워드"
          onChange={handleChange} /><br />
        <button onClick={handleSubmit}>사용자 등록</button>
      </form><br /><br />
      <button onClick={handleGithub}>깃허브 로그인</button>
      <br /><br />
      {user && <p>accessToken={user.accessToken}</p>}
      {user && <p>email={user.email}</p>}
      {user && <p>uid={user.uid}</p>}
      {user && user.displayName && <p>displayName={user.displayName}</p>}
      {user && user.photoURL && <p>photoURL={user.photoURL}</p>}
    </div>
  )
}