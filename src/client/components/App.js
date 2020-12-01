import React, {useState, useEffect} from 'react';
import Card from './Card'

function App(props) {
	const [restaurants, setRestaurants] = useState([])
	const [filter, setFilter] = useState('')

	useEffect(() => { getData() }, [])
 
	async function getData (){
		const response = await fetch('https://developers.zomato.com/api/v2.1/search?entity_id=292&entity_type=city', {
			headers: {
				'user-key':'df097b3d67979be7e0abe5c490d3c345'
			}
		})
		const data = await response.json()
		setRestaurants(data.restaurants)
	}

	function handleFilter (e){
		const value = e.target.value.toLowerCase()
		setFilter(value)
	}

  return (
    <div className="App">
			
			<input placeholder='Filter Search' onChange={handleFilter}></input>

			<div className="App-restaurant">
				{restaurants.map((el) => {
					if (el.restaurant.name.toLowerCase().includes(filter)){
						return (
							<Card 
								key={el.restaurant.id}
								name={el.restaurant.name} 
								userRating={el.restaurant.user_rating.aggregate_rating}
								image={el.restaurant.thumb}
								cuisines={el.restaurant.cuisines}
								address={el.restaurant.location.address}
								id={el.restaurant.id}
							/> 
							)
						}
				})}
			</div>
    </div>
  );
}

export default App;
