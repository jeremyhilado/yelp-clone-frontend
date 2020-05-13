import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
    return(
        <div class="container home-div">
            <h1>The Rundown</h1>
            <Link to='/login'><button type="button" class="btn btn-primary btn-lg btn-block home-btn">Log In</button></Link>
            <Link to='/register'><button type="button" class="btn btn-secondary btn-lg btn-block home-btn">Sign Up</button></Link>
        </div>
    )
}

export default Home