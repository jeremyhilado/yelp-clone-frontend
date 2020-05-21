import React, {useState, useEffect, useContext} from 'react'
import BusinessDetail from './BusinessDetail'
import CreateBusiness from './CreateBusiness'
import Login from './Login'
import Register from './Register'
import Search from './Search'
import SearchResults from './SearchResults'
import {Route, Switch} from 'react-router'
import Dashboard from './Dashboard'
import Home from './Home'
import CreateReview from './CreateReview'
import EditReview from './EditReview'
import EditBusiness from './EditBusiness'
import {getBusinesses, getReviews} from '../services/api-helper'
import { RundownContext } from '../App'

function Main(props) {
    const [businesses, setBusinesses] = useState([])
    const [reviews, setReviews] = useState([])
    const rundownContext = useContext(RundownContext)

    useEffect(() => {
        const makeApiCall = async () => {
            const res1 = await getBusinesses(rundownContext.userInfo.token)
            const res2 = await getReviews(rundownContext.userInfo.token)
            setBusinesses(res1.data)
            setReviews(res2.data)
        }
        makeApiCall()
      }, [businesses, reviews])

    return(
        <div>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/dashboard' render={props => <Dashboard {...props} />} />
                <Route exact path='/business/:name' render={props => <BusinessDetail {...props} reviews={reviews} />} />
                <Route exact path='/business/:name/writereview' render={props => <CreateReview {...props} reviews={reviews} />} />
                <Route exact path='/business/:name/editreview/:id' render={props => <EditReview {...props} reviews={reviews} />} />
                <Route exact path='/create' render={props => <CreateBusiness {...props} businesses={businesses} />} />
                <Route exact path='/business/:name/editbusiness/:id' render={props => <EditBusiness {...props} businesses={businesses} />} />
            </Switch>

        </div>
    )
}

export default Main