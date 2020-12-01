import React from 'react';
import { useHistory } from "react-router-dom"

const Card = ({ name, userRating, image, cuisines, address, id }) => {
	const history = useHistory()

	function handleRestaurantClick (){
		history.push(`/restaurant${id}`)
	}

	function defaultSrc (e){
		e.target.src = 'https://img.icons8.com/dotty/80/000000/image--v1.png'
	}

	return (
		<div className="App-restaurant-card">
			<img src={image} alt='restaurant' onError={defaultSrc} onClick={handleRestaurantClick}></img>
			<p>{name}</p>
			<p>{address}</p>
			<p>Rating: {userRating}</p>
			<p>{cuisines}</p>
		</div>
	)
}

export default Card