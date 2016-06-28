import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

export default class CardModal extends Component {
	componentDidUpdate() {
		ReactDOM.findDOMNode(this.refs.front).focus();
	}

	onSave = (e) => {
		let front = ReactDOM.findDOMNode(this.refs.front);
		let back = ReactDOM.findDOMNode(this.refs.back);

		this.props.onSave(
			Object.assign(
				{},
				this.props.card,
				{
					front: front.value,
					back: back.value
				}
			)
		);

		browserHistory.push(`/deck/${this.props.card.deckId}`);
	}

	onDelete = (e) => {
		this.props.onDelete(this.props.card.id);
		browserHistory.push(`/deck/${this.props.card.deckId}`);
	}

	render() {
		let { card, onDelete } = this.props;

		return (
			<div>
				<h1>{ onDelete ? 'Edit' : 'New' } Card</h1>
				<label>Card Front: </label>
				<textarea ref='front' defaultValue={card.front} />
				<label>Card Back: </label>
				<textarea ref='back' defaultValue={card.back} />

				<p>
					<button onClick={this.onSave}>Save Card</button>
					<Link className="buttons" to={`/deck/${card.deckId}`}>Cancel</Link>
					{onDelete ?
						<button onClick={this.onDelete}>Delete Card</button>
						: null
					}
				</p>
			</div>
		);
	}
}
