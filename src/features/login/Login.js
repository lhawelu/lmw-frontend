import React, { useState } from 'react'

const handleLogin = (e, body, history) => {
  e.preventDefault();
  fetch("http://localhost:3000/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: body
    })
  .then(res => res.json())
  .then(tokenObj => {
    if (tokenObj.jwt) {
        localStorage.setItem('token', tokenObj.jwt);
        localStorage.setItem('username', tokenObj.user.username);
        history.push('/orders')
    }
    else {
        alert(tokenObj.message);
    }
  });
}

export const Login = ({ history}) => {

  const [username, setUsername] = useState("")
  const [password, setPass] = useState("")

  const body = JSON.stringify({ user: {username, password}})

  return (
    <div>
      <form onSubmit={e => handleLogin(e, body, history)}>
        <div>
          <input name="username" onChange={e => setUsername(e.target.value)}/>Username
        </div>
        <div>
          <input name="password" type="password" onChange={e => setPass(e.target.value)}/>Password
        </div>
        <div style={{display: 'flex','justifyContent': 'center'}}>
          <input type="submit" value="GO"/>
        </div> 
      </form>
    </div>
  )
}