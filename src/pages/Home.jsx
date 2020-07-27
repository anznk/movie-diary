import React, {useState} from "react";
import { Link } from "react-router-dom";
import {db} from '../firebase/Firebase';
import firebase from '../firebase/Firebase';
import '../styles/Home.scss';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);

  var userId = firebase.auth().currentUser.uid;
  if(loading && !movieList.length){
    db
    .ref(`/${userId}`)
    .orderByChild("addedDate")
    .once("value")
    .then(snapshot => {
      const snapshotVal = snapshot.val();
      let movies = [];
      for(let i in snapshotVal){
        
        movies.push(snapshotVal[i]);
      }
      
      setMovieList(movies);
      setLoading(false);
    })
  }
  if(loading){
    return <h1>Loading....</h1>
  }
  return (
  <div className="body">
  <div className="grid">     
  {movieList && movieList.map(movie => (
    <section key={movie.id}>
      <ul>
        <Link to={`/${movie.id}`}>
          <img src={movie.coverImage} alt={movie.coverImageAlt} />
          {/* <div className="info">
          {movie.title}
          </div> */}
          {/* {movie.title} */}
        </Link> 
      </ul>
    </section>
  ))}
</div>
</div>
  );
};

export default Home;