import React, {useState, useEffect, createContext} from 'react';
import './App.css';
import Main from './components/Main'
import Navbar from './components/Navbar'
import {getBusinesses, login, register, createReview, updateReview, getReviews, createBusiness, updateBusiness} from './services/api-helper'
import 'bootstrap/dist/css/bootstrap.min.css'


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
  const [reviewId, setReviewId] = useState('')
  const [reviews, setReviews] = useState([])
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    image_url: '',
    location_city: '',
    location_state: '',
    category: '',
    price: '',
    phone: ''
  })
  const [businessCreated, setBusinessCreated] = useState(false)
  const [businessId, setBusinessId] = useState('')

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

  const handleBusinessChange = e => {
    const value = e.target.value
    setBusinessInfo({...businessInfo, [e.target.name]: value})
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
    }).then(setReviewCreated(false))
  }

  const handleCreateBusiness = async (e) => {
    e.preventDefault()
    await createBusiness(businessInfo, userInfo.token).then(res => {
      if(res.status === 201) {
        alert('Business successfully added!')
        setBusinessCreated(true)
      } else {
        alert('There was a problem with adding this business.')
      }
    }).then(setBusinessCreated(false))
  }

  const handleEditReview = async (e) => {
    e.preventDefault()
    await updateReview(reviewId, reviewInfo, userInfo.token).then(res => {
      if(res.status === 200) {
        alert('Review successfully updated!')
        setReviewCreated(true)
      } else {
        alert('There was a problem with editing your review.')
      }
    }).then(setReviewCreated(false))
  }

  const handleEditBusiness = async (e) => {
    e.preventDefault()
    await updateBusiness(businessId, businessInfo, userInfo.token).then(res => {
      if(res.status === 200) {
        alert('Business successfully updated!')
        setBusinessCreated(true)
      } else {
        alert('There was a problem with editing this business.')
      }
    }).then(setBusinessCreated(false))
  }
  
  useEffect(() => {
    const makeApiCall = async () => {
        const res1 = await getBusinesses(userInfo.token)
        const res2 = await getReviews(userInfo.token)
        setBusinesses(res1.data)
        setReviews(res2.data)
    }
    makeApiCall()
  }, [])

  console.log('App - reviews', reviews)

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
          setReviewCreated,
          reviewInfo,
          handleEditReview,
          reviews,
          setReviews,
          setReviewId,
          handleBusinessChange,
          businessCreated,
          businessInfo,
          handleCreateBusiness,
          setBusinessId,
          handleEditBusiness
        }
      }>
        <Navbar/>
        <Main/>
      </RundownContext.Provider>
    </div>
  );
}

export default App
export const RundownContext = createContext()
