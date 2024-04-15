import React, { useState } from "react";
import { register, loginWithGithub, logout, login } from '../api/firebase';
import { uploadImage } from "../api/cloudinary";

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({email:'', password:'', name:'', photo:''});
  const [file, setFile] = useState();
  const [user, setUser] = useState();
  const handleChange = e => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }
  const handleSubmit = e => {
    e.preventDefault();
    register(userInfo);
  }
  const handleGithub = e => {
    loginWithGithub().then(setUser);
  }
  const handleLogout = () => {
    logout().then(setUser);
  }
  const handleUpload = e => {
    setFile(e.target.files && e.target.files[0]);
    uploadImage(file)
      .then(url => setUserInfo({...userInfo, ['photo']: url}));
  }
  const handleLogin = () => {
    login(userInfo).then(setUser);
  }

  return (
    <div style={{margin: '20px'}}>
      <form onSubmit={handleSubmit}>
        <input type="email" name='email' value={userInfo.email} placeholder="이메일"
          onChange={handleChange} /><br />
        <input type="password" name='password' value={userInfo.password} placeholder="패스워드"
          onChange={handleChange} /><br />
        <input type="text" name='name' value={userInfo.name} placeholder="이름"
          onChange={handleChange} /><br />
        <input type="file" accept="image/*" name='file' onChange={handleUpload} /><br />
        <button onClick={handleSubmit}>사용자 등록</button>
        <button onClick={handleLogin}>로그인</button>
        <button onClick={handleLogout}>로그아웃</button>
      </form><br /><br />
      <button onClick={handleGithub}>깃허브 로그인</button>
      <br /><br />
      {user && <p>accessToken={user.accessToken}</p>}
      {user && <p>email={user.email}</p>}
      {user && <p>uid={user.uid}</p>}
      {user && user.displayName && <p>displayName={user.displayName}</p>}
      {user && user.photoURL && (
        <img src={user.photoURL} alt={user.displayName} width={200} />
      )}
    </div>
  )
}