import React, {useState, useEffect, useContext} from 'react'
import {RundownContext} from '../App'
import {getBusinesses} from '../services/api-helper'
import {Link} from 'react-router-dom'

function Dashboard(props) {
    const rundownContext = useContext(RundownContext)
    const [businesses, setBusinesses] = useState([])

    useEffect(() => {
        const businesses = async () => {
            const res = await getBusinesses(rundownContext.userInfo.token)
            console.log('Dashboard - res', res)
            setBusinesses(res.data)
        }
        businesses()
    }, [])

   
    console.log('Dashboard', businesses)

    const businessList = businesses.map((business, i) => {
        return(
            <Link key={i} to={`/business/${business.name}`}>
                <div className="card mb-3" style={{maxWidth: 540}}>
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={business.image_url ? business.image_url : 'https://res.cloudinary.com/do6tcpizk/image/upload/c_scale,h_700,w_700/v1585845946/Project%202%20React%20App/product_image_not_available_otx8jx.png'} className="card-img" alt="..."/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{business.name}</h5>
                                <p className="card-text">{business.category}</p>
                                <p className="card-text"><small className="text-muted">{business.location_city}, {business.location_state}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    })

    return(
        <div className="container">
            {businessList}
        </div>
    )
}

export default Dashboard