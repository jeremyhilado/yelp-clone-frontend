import React, {useState, createContext} from 'react';
import './App.css';
import Main from './components/Main'
import {getBusinesses, login} from './services/api-helper'


function App() {
  const [userInfo, setUserInfo] = useState(() => {
    const result = localStorage.getItem('user')
    return result ? JSON.parse(result) : []
  })
  
  const [businesses, setBusinesses] = useState([])
  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const [loggedIn, setLoggedIn] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value
    setUser({...user, [e.target.name]: value})
  }

  const businessList = async () => {
    const res = await getBusinesses(userInfo.token)
    console.log('App - res', res)
    setBusinesses(res.data)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    await login(user).then(res => {
        if(res.status === 200) {
            setUserInfo(res.data)
            localStorage.setItem('user', JSON.stringify(res.data))
            setLoggedIn(true)
            console.log('login', res)
        } else {
            console.log('login error')
            alert('A user with that username or password was not found.')
        }
    })
  } 

  return (
    <div className="App">
      <RundownContext.Provider value={
        {
          user,
          setUser,
          userInfo,
          setUserInfo,
          businesses,
          setBusinesses,
          businessList,
          handleChange,
          handleLogin,
          loggedIn,
          setLoggedIn
        }
      }>
        <Main/>
      </RundownContext.Provider>
    </div>
  );
}

export default App
export const RundownContext = createContext()
