import React, {useState, useEffect} from 'react';
import Lightbox from 'react-image-lightbox';
import { useParams } from "react-router-dom"
import 'react-image-lightbox/style.css';

const Restaurant = () => {
	const [restaurant, setRestaurant] = useState({})
	const [lightbox, setLightbox] = useState({photoIndex: 0, isOpen: false})

	const { id } = useParams()

	useEffect(() => { getRestaurant(id)}, [] )

	async function getRestaurant(id){
		const response = await fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${id}`, {
			headers: {
				'user-key':'df097b3d67979be7e0abe5c490d3c345'
			}
		})
		const data = await response.json()
		setRestaurant(data)
	}

	function defaultSrc (e){
		e.target.src = 'https://img.icons8.com/dotty/80/000000/image--v1.png'
	}

	if (Object.keys(restaurant).length === 0){
		return <div></div>
	}

	const { average_cost_for_two, highlights, name, thumb, cuisines, phone_numbers,  featured_image, url } = restaurant
	const { address, city, zipcode } = restaurant.location

	const images = [featured_image, thumb]
	
	return (
		<div className='individual-restaurant'>
			<img src={thumb} alt='restaurant' onError={defaultSrc}></img>
			<a href={url} target="_blank">{name}</a>
			<p>{address}, {city}, {zipcode}</p>
			<p>Cuisines: {cuisines}</p>
			<p>Phone Number: {phone_numbers} </p>
			<p>Average Cost For 2 People ${average_cost_for_two}</p>

			<h2>Highlights</h2>
			{highlights.map((el) => (<span>{el}</span>))}

			<div>
				<button onClick={() => {setLightbox({...lightbox, isOpen: true})}}>View Photos</button>
			</div>

			{lightbox.isOpen && (
				<Lightbox
					mainSrc={images[lightbox.photoIndex]}
					nextSrc={images[(lightbox.photoIndex + 1) % images.length]}
        	prevSrc={images[(lightbox.photoIndex + images.length - 1) % images.length]}
					onCloseRequest={() => {setLightbox({...lightbox, isOpen: false})}}
					onMovePrevRequest = {() => {setLightbox({...lightbox, photoIndex: (lightbox.photoIndex - 1) % images.length})}}
					onMoveNextRequest = {() => {setLightbox({...lightbox, photoIndex: (lightbox.photoIndex + 1) % images.length})}}
				/>
			)}
		
		</div>
		
	)
}

export default Restaurant