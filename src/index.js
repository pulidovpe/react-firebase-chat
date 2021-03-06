import React, { Component } from 'react';
import { render } from 'react-dom';
import firebase from 'firebase';
import Authenticate from './components/Authenticate';

firebase.initializeApp({
	apiKey: "AIzaSyDVBZs_8CIgSEAmffzoTz89gcTBuWYTNHc",
	authDomain: "chat-react-firebase-ee307.firebaseapp.com",
	databaseURL: "https://chat-react-firebase-ee307.firebaseio.com",
	projectId: "chat-react-firebase-ee307",
	storageBucket: "chat-react-firebase-ee307.appspot.com",
	messagingSenderId: "712716613599"
});

class App extends Component {
	render() {
		return(
			<div>
				<nav className="navbar navbar-light bg-primary ">
					<a className="navbar-brand text-white">Chat React</a>
					<div className="ml-auto">
					</div>
				</nav>
				<div className="container p-5">
					<div className="row">
						<div className="col-md-6 offset-md-3">
							<Authenticate />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

render( <App />, document.getElementById('app') );