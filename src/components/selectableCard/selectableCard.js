import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SelectableCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			interests: []
		};
	}

	render() {
		return (
			<label className="card-label">
				<input type="checkbox"/>
				<div className='card fadeInDown' style={{animationDelay: `${this.props.animDelay}s`}}>
					<h1>{this.props.name}</h1>
					<h2>{this.props.followers}</h2>
					<div className='checkbox-square'></div>
					<div className='bg-img'></div>
				</div>
			</label>
		);
	}

}

export default SelectableCard;

SelectableCard.propTypes = {
	name: PropTypes.string,
	followers: PropTypes.string,
	imgPath: PropTypes.string,
	animDelay: PropTypes.number
};
