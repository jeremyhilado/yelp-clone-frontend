import React, {useContext} from 'react'
import {RundownContext} from '../App'
import {Link} from 'react-router-dom'

function BusinessDetail(props) {
    const rundownContext = useContext(RundownContext)

    console.log('BusinessDetail props', props)
    console.log('BusinessDetail rundownContext.businesses', rundownContext.businesses)

    const business = rundownContext.businesses.filter(business => {
        return business.name === props.match.params.name
    })

    console.log(business)

    if(business[0]) {
        return(
            <div>
                <div className="detail-header">
                    <h1>{business[0].name}</h1>
                    <Link to={`/business/${business[0].name}/writereview`}><button type="button" className="btn btn-info">Write Review</button></Link>
                </div>
                    <div className="detail-info">
                        <img className="detail-img" src={business[0].image_url ? business[0].image_url : 'https://res.cloudinary.com/do6tcpizk/image/upload/c_scale,h_700,w_700/v1585845946/Project%202%20React%20App/product_image_not_available_otx8jx.png'}/>
                        <div className="detail-details">
                            <h3>Category: {business[0].category}</h3>
                            <h3>Location: {business[0].location_city}, {business[0].location_state}</h3>
                            <h3>Phone: ({business[0].phone.substring(0, 3)}) {business[0].phone.substring(3, 6)} - {business[0].phone.substring(6, 10)}</h3>
                            <h3>Price Range: {business[0].price}</h3>
                        </div>
                    </div>
            </div>
        )
    } else {
        return <></>
    }

}

export default BusinessDetail