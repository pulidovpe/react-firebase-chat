import React, { Component } from 'react';
import firebase from 'firebase';

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
					<img width="25" src={this.state.user.photoURL} alt={this.state.user.displayName} />
					<b>{this.state.user.displayName}</b>
					<button onClick={this.handleLogout} className="btn btn-outline-dark btn-sm">Logout</button>
				</div>
			) 
		} else {
			return (
				<div>
					<button onClick={this.handleAuth} className="btn btn-outline-dark btn-sm">Login</button>
				</div>
			)
		}
	}
}

export default Authenticate;