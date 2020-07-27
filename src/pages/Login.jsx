import React, { useState } from 'react'
import firebase, {providerGoogle, providerTwitter, providerGithub, providerFacebook} from '../firebase/Firebase';
import '../styles/Login.scss';
import 'font-awesome/css/font-awesome.min.css'; 

const Login = () => {
	const [userEmail, setUserEmail] = useState({
		email:"",
		password:""
	});
	const handleChange = event => {
    setUserEmail({ ...userEmail, [event.target.name]: event.target.value });
  };

	const handleSignUp = e => {
    e.preventDefault();
		// // cheak if the user exist 
		// console.log("emailVerified" ,firebase.auth().currentUser.emailVerified);
		// const verified = firebase.auth().currentUser.emailVerified;
		// if (!verified) {
		// 	// send an e-mail
		// 	firebase.auth().currentUser.sendEmailVerification();
		// 	var email = firebase.auth().currentUser.email;
		// 	console.log('確認メールを送信しました。', email);
		// }		
    firebase.auth().createUserWithEmailAndPassword(userEmail.email, userEmail.password)
      .then(user => {
        console.log(user);
				setUserEmail({
					email: null, 
					password: null
				})
      })
      .catch(error => {
        console.log('firebase error', error);
      });
  }

  const loginGoogle = () => {
    firebase.auth().signInWithPopup(providerGoogle)
      .catch(function (error) {
        console.error(error);
      });
  }
  const loginTwitter = () => {
    firebase.auth().signInWithPopup(providerTwitter)
      .catch(function (error) {
        console.error(error);
      });
  }
  const loginGithub = () => {
    firebase.auth().signInWithPopup(providerGithub)
      .catch(function (error) {
        console.error(error);
      });
  }
  const loginFacebook = () => {
    firebase.auth().signInWithPopup(providerFacebook)
      .catch(function (error) {
        console.error(error);
      });
  }
  return (
    <div className="loginBody">
		<h1>Login</h1>
		<div className="snsLogin">
		<button onClick={loginGoogle} className="ggl">
			<i className="fa fa-google  fa-fw"></i> Login with Google
		</button>
		<button onClick={loginTwitter} className="tw">
			<i className="fa fa-twitter fa-lg fa-fw"></i> Login with Twitter
		</button>
		<button onClick={loginFacebook} className="fb">
			<i className="fa fa-facebook fa-lg fa-fw"></i> Login with Facebook
		</button>
		<button onClick={loginGithub} className="gh">
			<i className="fa fa-github fa-lg fa-fw"></i> Login with GitHub
		</button>
		</div>
		 <h2 className="boder">Log in with your email address</h2>

		
		<div className="loginEmail">
			<form onSubmit={handleSignUp}>
				<input
					type="text"
					placeholder="email address"
					name="email"
					value={userEmail.email}
					onChange={handleChange}
				/>
				<input
					type="password"
					placeholder="password"
					name="password"
					value={userEmail.password}
					onChange={handleChange}
				/>
				<input type="submit" className="btn" value="Login" />
			</form>
    </div>
  </div>
  );
};
export default Login;