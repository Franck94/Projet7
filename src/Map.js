import React, { Component } from 'react';
import MapComponent from './Mapcomponent';


class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {  
      isOpen : false,
      map:null
    }
  }

  handleToggleOpen = (index) => {
    this.setState(prevState => ({
        isOpen: index
    }));
  }
  handleToggleClose = () => {
    this.setState({
      isOpen: -1
  });
  }

  mapMoved(){
    console.log("map moved :" + JSON.stringify(this.state.map.getCenter()))
    this.props.mapDrag(this.state.map.getCenter().lat(),this.state.map.getCenter().lng());  
  }



  mapLoaded(map){
    if (this.state.map!=null)
    return
    this.setState({
      map: map
    })
   
  }
 

  render() {
    return (
      <div>
        <MapComponent
          refMap={this.mapLoaded.bind(this)}
          onDragEnd={this.mapMoved.bind(this)}
          currentMarkerShown={this.props.restaurantGoogleMarker}
          currentLocation={this.props.restaurantGoogle} 
          restaurant={this.props.restaurant}
          onMarkerClick={this.handleToggleOpen}
          onMarkerClose={this.handleToggleClose}
          isOpen={this.state.isOpen}
          isClick={this.props.mapClick}
          commentClick={this.props.CommentClick}
          />
      </div>
    );
  }
}


export default Map