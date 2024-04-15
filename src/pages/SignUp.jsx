import React, { useState } from "react";
import { register } from '../api/firebase';

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({email:'', password:''});
  const [user, setUser] = useState(null);
  const handleChange = e => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }
  const handleSubmit = e => {
    e.preventDefault();
    register(userInfo)
      .then(result => {
        console.log(result);
        setUser(result);
      })
  }

  return (
    <div style={{margin: '20px'}}>
      <form onSubmit={handleSubmit}>
        <input type="email" name='email' value={userInfo.email} placeholder="이메일"
          onChange={handleChange} /><br />
        <input type="password" name='password' value={userInfo.password} placeholder="패스워드"
          onChange={handleChange} /><br />
        <button onClick={handleSubmit}>사용자 등록</button>
      </form>
    </div>
  )
}