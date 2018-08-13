import React, { Component } from 'react'
import Map from './Map'
import Place from './Place'
import './App.css'
import getAverageRating from './Utilitaire'
import 'font-awesome/css/font-awesome.min.css'



class App extends Component {

  constructor(props)
    {

        super(props);
        this.state={
            isLoaded:false,
            error:null,
            restaurantMarker:[],
            data:[],
            value:"0",
            currentLatLng: {
              lat: 0,
              lng: 0
            },
            currentMarkerShown:false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.showCurrentLocation= this.showCurrentLocation.bind(this)
    }



// GEOLOCALISATION

  showCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.setState(prevState => ({
              currentLatLng: {
                ...prevState.currentLatLng,
                lat: position.coords.latitude,
                lng: position.coords.longitude
              },
              currentMarkerShown: true,
            }) ,() => this.getRestaurant(this.state.currentLatLng.lat,this.state.currentLatLng.lng))
          }
        )
      }
    }
 
  // FETCH RESTAURANT

  getRestaurant(lat, lng){
      this.setState(prevState => ({
        currentLatLng: {
          ...prevState.currentLatLng,
          lat: lat,
          lng: lng
        },
        restaurantMarker: []}
      ))
  fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+ lat + ',' + lng +'&radius=350&type=restaurant&key=AIzaSyCR1TgiHF87DfPi1r1p_qwpc-NcV0uhgk0')
      .then(response => response.json())
      .then(
        (data) => {
          data = {item : data}
          for( let i=0 ; i<data.item.results.length;i++)
          {
  fetch('https://maps.googleapis.com/maps/api/place/details/json?placeid='+ data.item.results[i].place_id +'&fields=name,geometry,rating,formatted_address,reviews&key=AIzaSyCR1TgiHF87DfPi1r1p_qwpc-NcV0uhgk0')
        .then(response => response.json())
        .then(
          (data) => {
            data = { item : data }
            let newRestaurant = this.state.restaurantMarker;

            newRestaurant.push({
            restaurantName: data.item.result.name,
            address: data.item.result.formatted_address,
            lat: data.item.result.geometry.location.lat,
            long: data.item.result.geometry.location.lng,
            //ratingsAverage: data.item.result.rating,
            ratings:data.item.result.reviews? data.item.result.reviews.map(
              (item)  => ({
                stars : item.rating,
                comment : item.text
              })
            ):[]
        })
            this.setState({
              isLoaded: true,
              restaurantMarker : newRestaurant
            })})
          }
      });  
  /*fetch('http://projet3.crapulax.fr/test/Restaurant.json')
      .then(response => response.json())
      .then(
          (data) => {
            data = {item : data}
       this.setState({
            isLoaded: true,
            restaurantMarker: data.item
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )*/
    }
 

  componentDidMount(){
    this.showCurrentLocation();
    }

  handleChange(event)
    {
      this.setState({value: event.target.value});
    }

// HANDLE MOUSSE CLICK // ADD RESTAURANT

  handleClick(event){
    let nomDeRestaurant= prompt("Nom du restaurant")
    let adressDuRestaurant= prompt("Adress du restaurant") +", " + prompt("ZipCode") +" " + prompt("Ville")
    let comment = prompt("Votre Avis")
    let etoile = prompt("Votre note")
    let newRestaurant = this.state.restaurantMarker;
    newRestaurant.push({
      restaurantName: nomDeRestaurant,
      address:adressDuRestaurant,
      lat:event.latLng.lat(),
      long:event.latLng.lng(),
      ratings:[
         {
            stars:Number.parseInt(etoile),
            comment:comment
         },
      ]
   })
   this.setState({
     restaurantMarker : newRestaurant
   })
  }

// SORT RESTAURANT // GET AVERAGE RATING

  sortRestaurant(value){
    let sortRestaurant1 = this.state.restaurantMarker
    .sort((a,b) => getAverageRating(b) - getAverageRating(a))
    .filter(item => getAverageRating(item) >= this.state.value)
    return sortRestaurant1
  }

// ADD COMMENT

  addComment(index){
    let comment = prompt("Votre Avis")
    let etoile = prompt("Votre note")
    let newCommentaire = this.sortRestaurant(this.state.restaurantMarker);
    newCommentaire[(index)].ratings.push({
           stars:Number.parseInt(etoile),
           comment:comment
    })
    this.setState({
      restaurantMarker : newCommentaire
    })
  };


 
  render() {

    if (this.state.isLoaded === false){
    return(
    <div> Non fonctionnel </div>
    )}
    else {
    return (

      <div className="container-fluid">
        <div className="header col-lg-12">
        <div id="Commentaire">
          <p> Trouves ton restaurant près de chez toi ! ! </p>
        </div>
        </div>
        <div className="row">
        <div className="Map col-lg-7">
        <Map  mapDrag={this.getRestaurant.bind(this)} restaurant={this.sortRestaurant()} optionValue={this.state.value} mapClick={(e) => this.handleClick(e)} CommentClick={(e) => this.addComment(e)}  restaurantGoogle={this.state.currentLatLng} restaurantGoogleMarker={this.state.currentMarkerShown}/>
        </div>
        <div className="Information col-lg-5 " overflow="hidden">
        <div className="Filtre">
              <select value={this.state.value} onChange={this.handleChange}>
                <option value="0">Pas de filtre</option>
                <option value="1">1 étoile</option>
                <option value="2">2 étoiles</option>
                <option value="3">3 étoiles</option>
                <option value="4">4 étoiles</option>
                <option value="5">5 étoiles</option>
              </select>
        </div>
        <div className="Place">
        <Place restaurant={this.sortRestaurant()} optionValue={this.state.value} CommentClick={(e) => this.addComment(e)}  />
        </div>
        </div>
       
        </div>
        </div>
    );
  }
  }
}

export default App