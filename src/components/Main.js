import React from 'react'
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

function Main() {
    return(
        <div>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/business/:name' component={BusinessDetail} />
                <Route exact path='/business/:name/writereview' component={CreateReview} />
            </Switch>

        </div>
    )
}

export default Main