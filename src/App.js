import React, {useState, useEffect, createContext} from 'react';
import './App.css';
import Main from './components/Main'
import {getBusinesses, login, register, createReview} from './services/api-helper'


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
  const [userSignup, setUserSignup] = useState({
    email: '',
    username: '',
    password: '',
    first_name: '',
    last_name: ''
  })
  const [reviewInfo, setReviewInfo] = useState({
    business: '',
    rating: '',
    review: ''
  })
  const [reviewCreated, setReviewCreated] = useState(false)

  const handleLoginChange = e => {
    const value = e.target.value
    setUser({...user, [e.target.name]: value})
  }

  const handleRegisterChange = e => {
    const value = e.target.value
    setUserSignup({...userSignup, [e.target.name]: value})
  }

  const handleReviewChange = e => {
    const value = e.target.value
    setReviewInfo({...reviewInfo, [e.target.name]: value})
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

  const handleRegister = async (e) => {
    e.preventDefault()
    await register(userSignup).then(res => {
        if(res.status === 201) {
            setUserInfo(res.data)
            localStorage.setItem('user', JSON.stringify(res.data))
            setLoggedIn(true)
        } else {
            alert('There was a problem creating your account.')
        }
    })
  }

  const handleCreateReview = async (e) => {
    e.preventDefault()
    await createReview(reviewInfo, userInfo.token).then(res => {
      if(res.status === 201) {
        alert('Review successfully created!')
        setReviewCreated(true)
      } else {
        alert('There was a problem with creating your review.')
      }
    })
  }

  useEffect(() => {
    const businessList = async () => {
        const res = await getBusinesses(userInfo.token)
        console.log('App - res', res)
        setBusinesses(res.data)
    }
    businessList()
  }, [])

  return(
    <div className="App">
      <RundownContext.Provider value={
        {
          user,
          setUser,
          userSignup,
          setUserSignup,
          userInfo,
          setUserInfo,
          businesses,
          setBusinesses,
          handleLoginChange,
          handleRegisterChange,
          handleLogin,
          handleRegister,
          loggedIn,
          setLoggedIn,
          handleReviewChange,
          handleCreateReview,
          reviewCreated,
          setReviewCreated
        }
      }>
        <Main/>
      </RundownContext.Provider>
    </div>
  );
}

export default App
export const RundownContext = createContext()
