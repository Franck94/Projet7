import React from 'react';
import { compose, withProps, withStateHandlers } from 'recompose';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import ReactStreetview from 'react-streetview';


const googleMapsApiKey = 'AIzaSyA_WObUiYD7YpoYufR84re1LZHAJeAGXkY';



const MapComponent = compose(
    withStateHandlers(() => ({
        isMarkerClick: false,
        markerPosition: []
      }),
 
      ),
    withProps({
        loadingElement:<div style={{height:'100%'}} />,
        containerElement: <div style={{ height: `100vh`}} />,
        mapElement: <div style={{ height: `100%`}} />,
    }),
   
    withGoogleMap
)((props) =>
    <GoogleMap
        ref={props.refMap}
        onDragEnd={props.onDragEnd}
        defaultZoom={15}
        center={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
        defaultCenter={{ lat: 0, lng: 0}}
        onClick={props.isClick}
    >

        {props.currentMarkerShown &&
        <Marker
            position={{ lat: props.currentLocation.lat, lng: props.currentLocation.lng }}
            icon= {{url:"https://unpkg.com/leaflet@1.2.0/dist/images/marker-icon.png", Size:[38,95] }}
        />}



        {props.restaurant.map((item,index) => (
        <Marker
            key={index}
            position={{ lat:item.lat, lng:item.long}} 
            onClick = {() =>{
                props.onMarkerClick(index)
        }}
        >
        {props.isOpen === index &&
        <InfoWindow 
        onCloseClick={props.onMarkerClose}
        >
            <div style ={{width:"250px",height:"400px", backgroundColor:"#18181b"}}>
            <div style={{
            width:"250px",
            height:"250px",
            }}>
        <ReactStreetview
            apiKey={googleMapsApiKey} 
            streetViewPanoramaOptions={{
                position: {lat:  item.lat, lng: item.long},
                pov: {heading: 100, pitch: 0},
                zoom: 1
            }}
        >
        </ReactStreetview>
        </div><br></br><br></br>
        <div id="restaurantComment">{item.restaurantName}</div>
        <button id="Comment" onClick = {() =>{
                props.commentClick(index)}}
        >Add Comment</button>

       
        </div>
    </InfoWindow>}
        </Marker>))}
    </GoogleMap>

)



export default MapComponent