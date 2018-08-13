function getAverageRating(restaurant){
  let moyenne = 0;
  for(var i=0; i< restaurant.ratings.length; i++){
    moyenne += restaurant.ratings[i].stars;
 
  }
  let moyenneTotale = moyenne / restaurant.ratings.length;
  let MoyenneFinal = Math.round(moyenneTotale*10)/10;
  return  MoyenneFinal
 
  }


  export default getAverageRating 