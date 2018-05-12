import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Card extends Component {

	constructor(props) {
		super(props);
		this.state = {
			interests: []
		};
	}

	render() {
		return (
			<div className='card fadeInDown' style={{animationDelay: `${this.props.animDelay}s`}}>
				<h1>{this.props.name}</h1>
				<p>{this.props.description}</p>
			</div>
		);
	}

}

export default Card;

Card.propTypes = {
	name: PropTypes.string,
	description: PropTypes.string,
	animDelay: PropTypes.number
};
