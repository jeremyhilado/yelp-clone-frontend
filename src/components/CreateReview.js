import React, {useContext} from 'react'
import {RundownContext} from '../App'
import {Redirect} from 'react-router-dom'

function CreateReview(props) {
    const rundownContext = useContext(RundownContext)

    console.log('CreateReview props', props)

    const business = rundownContext.businesses.filter(business => {
        return business.name === props.match.params.name
    })

    console.log('CreateReview business', business)

    if(business[0]) {
        return(
            <div className="container">
                <h1>{business[0].name}</h1>
                <h4>Leave a review!</h4>
                <form className="review-form" onSubmit={rundownContext.handleCreateReview}>
                    <h6 className="review-rating">Rating</h6>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input radio-btn" type="radio" name="rating" id="inlineRadio1" value="1" onClick={rundownContext.handleReviewChange}/>
                        <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input radio-btn" type="radio" name="rating" id="inlineRadio2" value="2" onClick={rundownContext.handleReviewChange}/>
                        <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input radio-btn" type="radio" name="rating" id="inlineRadio3" value="3" onClick={rundownContext.handleReviewChange}/>
                        <label className="form-check-label" htmlFor="inlineRadio3">3</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input radio-btn" type="radio" name="rating" id="inlineRadio2" value="4" onClick={rundownContext.handleReviewChange}/>
                        <label className="form-check-label" htmlFor="inlineRadio4">4</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input radio-btn" type="radio" name="rating" id="inlineRadio3" value="5" onClick={rundownContext.handleReviewChange}/>
                        <label className="form-check-label" htmlFor="inlineRadio5">5</label>
                    </div>
                    <div className="form-group review-text">
                        <label htmlFor="exampleFormControlTextarea1">Review</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name="review" value={rundownContext.reviewInfo.review} onChange={rundownContext.handleReviewChange}></textarea>
                    </div>
                    <button type="submit" className="btn btn-info" name="business" value={business[0].id} onClick={rundownContext.handleReviewChange}>Post Review</button>
                </form>
                {rundownContext.reviewCreated && <Redirect to={`/business/${business[0].name}`} />}
            </div>
        )
    } else {
        return(
            <></>
        )
    }
}

export default CreateReview