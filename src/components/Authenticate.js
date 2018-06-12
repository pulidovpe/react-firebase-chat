import React, { Component } from 'react';
import firebase from 'firebase';

import ChatRoom from './ChatRoom';

class Authenticate extends Component {
	constructor(){
		super();
		this.state = {
			user  : null
		}
		this.handleAuth = this.handleAuth.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}
	
	componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.setState({ user })
		});
	}
	handleAuth() {
		const provider = new firebase.auth.GoogleAuthProvider();

		firebase.auth().signInWithPopup(provider)
			.then(result => console.log(`${result.user.displayName} ha iniciado sesion`))
			.catch(error => console.log(`Error ${error.code}: ${error.message}`));
	}
	handleLogout() {
		const usuario = this.state.user.displayName;

		firebase.auth().signOut()
			.then(result => console.log(`${usuario} se ha desconectado`))
			.catch(error => console.log(`Error ${error.code}: ${error.message}`));
	}

	render() {
		if(this.state.user){
			return (
				<div>
					<div className="row justify-content-md-center">
						<img width="25" src={this.state.user.photoURL} alt={this.state.user.displayName} />
						<b>{this.state.user.displayName}</b>
						<button onClick={this.handleLogout} className="btn btn-outline-dark btn-sm">Logout</button>
					</div>
					<ChatRoom user={this.state.user} />
				</div>
			) 
		} else {
			return (
				<div className="row justify-content-md-center">
					<h3>For chatting you need to authenticate!</h3>
					<button onClick={this.handleAuth} className="btn btn-outline-dark btn-sm">Login</button>
				</div>
			)
		}
	}
}

export default Authenticate;