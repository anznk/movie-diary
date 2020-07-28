import React from "react";
import firebase from '../firebase/Firebase';
import { Link } from "react-router-dom";
// import '../styles/Header.scss';
const Header = (props) => {
	const logout = () => {
    firebase.auth().signOut()
  }
  return (
    <>
		<nav>
			<div className="container">
				<div className="header-title">
				<Link to="/" className='text-link'>
					<h2>Movie Diary</h2>
				</Link>
				</div>
				{props.user && (
					<>
				<div className="header-search">
				
				<i className="fa fa-search" aria-hidden="true">
				<Link to="/AddMovie" className='text-link'>
				&nbsp;Seach
				</Link>
				</i>
				</div>
				{/* < SearchMovie /> */}
				<div className="header-signout">
				<a onClick={logout}>
					<i className="fa fa-sign-out" aria-hidden="true">
					Sign Out
					</i>
				</a>
				</div>
				</>
				)}
			</div>
		</nav>
		
		</>
  );
};

export default Header;
