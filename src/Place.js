import React, { Component } from 'react';
import getAverageRating from './Utilitaire';
import ReactStreetview from 'react-streetview';







class Place extends Component {




  render() {
    const googleMapsApiKey = 'AIzaSyA_WObUiYD7YpoYufR84re1LZHAJeAGXkY';
    console.log(this.props.restaurant)


    return (

      <div>
        <div id="ListeRestaurant">{
          this.props.restaurant.map((item, i) => {
            const streetViewPanoramaOptions = {
              position: { lat: item.lat, lng: item.long },
              pov: { heading: 100, pitch: 0 },
              zoom: 1
            };
            return (
              <div id="bloc" key={item.restaurantName}>
                <div id="bloc2">
                  <div id="photo">
                    <ReactStreetview
                      apiKey={googleMapsApiKey}
                      streetViewPanoramaOptions={
                        streetViewPanoramaOptions
                      }
                    >
                    </ReactStreetview>
                  </div>
                  <div id="restaurant">{item.restaurantName} <br></br>
                    <div className="stars-outer" width="100px">
                    <div className="stars-inner" style={{ width: Math.round((getAverageRating(item) / 5 * 100)) + "%" }}></div></div>
                    <div id="adress">{item.address}</div>
                    <hr></hr>
                    <button id="Comment" onClick = {() =>{
                    this.props.CommentClick(i)}}
                    >Add Comment</button>
                  </div>
              </div>
                <div id="comment">
                  {item.ratings.map((item2, index) =>
                    (<ul key={index}>
                      <li>
                        {item2.stars}/5 :
                    {item2.comment}
                      </li>
                    </ul>))}
                </div>
                </div>)
          })
        }

        </div>

      </div>

    );
  }
}

export default Place;