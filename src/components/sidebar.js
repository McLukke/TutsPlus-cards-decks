import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { addDeck, showAddDeck, hideAddDeck } from '../actions';
import { Link } from 'react-router';

const mapStateToProps = ({ decks, addingDeck }) => ({
  decks,
	addingDeck
});

const mapDispatchToProps = dispatch => ({
	addDeck: name => dispatch(addDeck(name)),
	showAddDeck: () => dispatch(showAddDeck()),
	hideAddDeck: () => dispatch(hideAddDeck())
});

class SideBar extends Component {
	componentDidUpdate() {
		let el = ReactDOM.findDOMNode(this.refs.add);
		if (el) el.focus();
	}

	createDeck = (e) => {
		if (e.which !== 13) return;
		let name = ReactDOM.findDOMNode(this.refs.add).value;
		this.props.addDeck(name);
		this.props.hideAddDeck();
	}

	render() {
		const { showAddDeck, decks, addingDeck } = this.props;

		return (
			<div className="sidebar">
				<h2>All Decks</h2>
				<ul>
					{
						decks.map((deck, i) =>
							<li key={i}>
								<Link to={`/deck/${deck.id}`}>{deck.name}</Link>
							</li>
						)
					}
				</ul>
				{addingDeck && <input ref='add' onKeyPress={this.createDeck} />}
			</div>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
