import React from "react";
import "./Card.css";

class Card extends React.Component {
	render() {
		return (
			<div className={"card " + this.props.inverse ? "card-inverse" : ""}>
				<div className="image-container">
					<img src={this.props.imageSrc} alt={this.props.title}/>
					<h4>{this.props.title}</h4>
				</div>
			</div>
		);
	}
}

export default Card;
