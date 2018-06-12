import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';

class ChatRoom extends Component {
	constructor(){
		super();
		this.state = {
			user: null,
			message  : '',
			messages : []
		}
		this.updateMsg = this.updateMsg.bind(this);
		this.submitMsg = this.submitMsg.bind(this);
	}
	componentWillMount() {
		/*console.log(`Usuario: ${this.props.user.displayName}`);*/
		this.setState({
			user: this.props.user
		})
	}
	componentDidMount() {
		/*console.log(this.props.user);*/
		firebase.database().ref('messages/').on('value', snapshot => {
			const currentMsg = snapshot.val();
			if(currentMsg != null) {
				this.setState({
					messages: currentMsg
				})
			}
		});
	}
	updateMsg(ev) {
		this.setState({
			message: ev.target.value
		});
	}
	submitMsg() {
		const msg = {
			id: this.state.messages.length,
			text: this.state.message,
			user: this.state.user.displayName,
			email: this.state.user.email
		}
		firebase.database().ref('messages/' + msg.id).set(msg);
		this.setState({message: ''});
		/*let listMsg = this.state.messages;
		listMsg.push(msg);
		this.setState({
			messages: listMsg,
			message: ''
		});*/
	}
	render() {
		const email = this.props.user.email;
		const currentMsg = this.state.messages.map((msg) => {
			return (
				<li key={msg.id} className="list-group-item list-group-item-action h6">
					<small><b>{ msg.email == email ? "You" : msg.user }: </b>{ msg.text }</small>
				</li>
			)				
		});
		return (
			<div className="card">
				<div className="card-body">
					<ul className="list-group">
						{currentMsg}
					</ul>
					<div className="card-footer">
						<input 
							type="text"
							value={this.state.message}
							onChange={this.updateMsg}
							placeholder="Write a message"
							className="form-control"
						/>
						<button 
							onClick={this.submitMsg}
							className="btn btn-primary btn-block">
							Send Message
						</button>
					</div>
				</div>
			</div>
		)
	}
}
ChatRoom.propTypes = {
	user: PropTypes.object
};

export default ChatRoom;