import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../styles/SearchMovie.scss';

const SearchMovie = props => {
	const [fetchedData, setFetchedData] = useState({});
	const [search, setSearch] = useState("");
	const apikey = process.env.REACT_APP_APIID;
	const url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${search}&page=1`;
	const inputRef = React.createRef();
	useEffect(()=>{
		if(fetchedData){
			props.getValue(fetchedData);
		}
		inputRef.current.focus();
	},[fetchedData]);

	const handleSubmit = async e => {
		e.preventDefault();
		fetchData(url);
	};
	const handleSearchChange = e => {
		setSearch(e.target.value);
	};
	const fetchData = url =>{
		axios
		.get(url)
		.then(data => {
			setFetchedData(data);
		})
		.catch(err => {
			console.log(err);
		});
	}
  return (
    <div className="searchArea">
      <form name="searchMovie" onSubmit={e => handleSubmit(e)}>
        <input
					className="searchBox"
					ref={inputRef}
          onChange={e => handleSearchChange(e)}
          type="text"
          id="search"
          // placeholder="Search Movie"
          name="search"
        />
        <button type="submit" className="btn">
          <i className="fa fa-search fa-fw" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
export default SearchMovie;