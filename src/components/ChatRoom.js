import React, { Component } from 'react';
import firebase from 'firebase';

class ChatRoom extends Component {
	constructor(){
		super();
		this.state = {
			message  : '',
			messages : []
		}
		this.updateMsg = this.updateMsg.bind(this);
		this.submitMsg = this.submitMsg.bind(this);
	}
	componentDidMount() {
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
			text: this.state.message
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
		const currentMsg = this.state.messages.map((msg) => {
			return (
				<li key={msg.id} className="list-group-item list-group-item-action">
					<p>{msg.text}</p>
				</li>
			)
		})
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

export default ChatRoom;