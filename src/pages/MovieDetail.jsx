import React, {useState} from "react";
import {db} from '../firebase/Firebase';
import firebase from '../firebase/Firebase';
import { Link } from "react-router-dom";
// import Edit from "./Edit";
import ReactStarsRating from 'react-awesome-stars-rating';
// import '../styles/MovieDetail.scss';


const MovieDetail = ({ match, history }) => {
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState();
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [overview, setOverview] = useState("");
	const [coverImage, setCoverImage] = useState("");
	const [comment, setComment] = useState("");
  const id = match.params.id;
	const [starState, setStarState] = useState({    
		value:0,
		selectedValue:0
    });
  const [isEdit, setIsEdit] = useState(false);

	const onChange = (value) => {
		setStarState({    
			value:value,
			selectedValue: value})
  }

  const addPost = () => {
    const addedDate = Date.now();
    const editedPost = {
      id,
      title,
      releaseDate,
      overview,
      coverImage,
      addedDate,
      starState,
      comment
    }
    db
      .ref(`/${userId}/${id}`)
      .set(editedPost)
      .then(() => history.push(`/${id}`))
      .catch(err => console.error(err.message));
    setIsEdit(false);
  }

  var userId = firebase.auth().currentUser.uid; 
  if(loading && !selectedMovie){
    db
    .ref(`${userId}/${id}`)
    .once("value")
    .then(snapshot => {
      if(snapshot.val()){
        setSelectedMovie(snapshot.val());
        const currentPost = snapshot.val();
        setTitle(currentPost.title);
        setReleaseDate(currentPost.releaseDate);
        setOverview(currentPost.overview);
        setCoverImage(currentPost.coverImage);
        setComment(currentPost.comment);
        setStarState({    
        value:currentPost.starState.value,
        selectedValue:currentPost.starState.selectedValue});
      }
      setLoading(false);
    })
    .catch(err => console.error(err.message));
  }

  if(loading){
    return <h1>Loading....</h1>
  }

  const postDoesNotExist = !selectedMovie;
  if(postDoesNotExist) {
    // return <Redirect to="/404" />
    console.log("Redirect to 404");
  }
// <button className="btn" onClick={addPost}>Add</button>
{/* <button className="btn" onClick={() => setIsEdit(true)}>edit</button> */}
  let showButton = isEdit ?
  <a className="btn" onClick={addPost} className="btn">Save</a> : 
  <a className="btn" onClick={() => setIsEdit(true)}className="btn">edit</a>;
  
  
  let commentArea = isEdit ?
  <textarea
  autoFocus
  onFocus={e => e.currentTarget.select()}
  id="content-field"
  type="text"
  value={comment}
  onChange={({target: {value}}) => {
    setComment(value);
  }}
  />: 
  <p className="comment">{comment}</p>;


  return (
    <div>
    <section className="detailBody">
      <div className="main box-left">
      <img src={selectedMovie.coverImage} alt={selectedMovie.coverImageAlt} />
      </div>
      <div className="main box-right">
      <h1>{selectedMovie.title}</h1>
      <p>{selectedMovie.releaseDate}</p>
      {/* <h4>synopsis</h4> */}
      <p>{selectedMovie.overview}</p>
      </div>
    </section>
    <section className="starsRating">
      <ReactStarsRating
      onChange={onChange}
      isEdit={isEdit}
      value={starState.value}
      selectedValue={starState.selectedValue}
      size='45'
      /> 
    </section>
    <section className="commentBox">
      {commentArea}
      
    </section>
    <section className="buttonArea">
    {showButton}
    <Link to={`/`} className="btn">Back</Link>
    </section>

    </div>
  );
};

export default MovieDetail;