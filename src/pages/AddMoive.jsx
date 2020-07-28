import React, { useState, useEffect } from 'react';
import {db} from '../firebase/Firebase';
import SearchMovie from "../components/SearchMovie"
import { Link } from "react-router-dom";
import firebase from '../firebase/Firebase';
// import '../styles/AddMovie.scss';

const AddMovie = ({ history }) => {
	const [movieSelected, setMovieSelected] = useState();
	const [suggestions, setSuggestions] = useState([]);
	
	//this will execute when a movie is "clicked"
	useEffect(() => {
		if (movieSelected) {
			console.log("movieSelected ", movieSelected);
			addwatched();
		}
	}, [movieSelected]);

  var userId = firebase.auth().currentUser.uid;
	const addwatched = () => {
		
		const newPost = {
			id: movieSelected.id,
			title: movieSelected.title,
			releaseDate: movieSelected.release_date,
			overview: movieSelected.overview,
			coverImage: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movieSelected.poster_path}`,
			addedDate: Date.now(),
			starState: {
				value: 0,
				isEdit: false,
				selectedValue: 0
			},
			comment: ""
		};
		db
			.ref(`${userId}/${movieSelected.id}`)
			.set(newPost)
			.then(() => history.push(`/`))
			.catch(err => console.error(err.message))
	}
	const changeValue = (value) => {
		setMovieSelected(value)
	}

	const getValue = (value) => {
		const inputResults = value.data && value.data.results;
		setSuggestions(inputResults);
	}
	return (
		<>
			<div>
				<SearchMovie getValue={getValue} />
			</div>
			<div className="body">
				<ul className="grid">
					{suggestions && suggestions.map(movie => (
						<li key={movie.id} onClick={() => changeValue(movie)}>
							<img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`} width="30%" alt={`${movie.original_title}`} />
						</li>
					))}
				</ul>
			</div>
			
			{suggestions && (
			<div>
			<Link to={`/`}>Back</Link>
			</div>
			)}
			</>
		

	)
}
export default AddMovie;