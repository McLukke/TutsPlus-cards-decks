import React from 'react';
import { Link } from 'react-router';

const Card = ({ card }) => {
	return (
		<div>
			<p>{card.front}</p>
			<Link className="buttons" to={`/deck/${card.deckId}/edit/${card.id}`}>Edit</Link>
		</div>
	);
};
export default Card;
