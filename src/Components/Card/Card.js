import React from "react";
import "./Card.css";
import Style from 'style-it';

class Card extends React.Component {
	constructor(props) {
		super(props);
		this.color = props.color ? props.color : "#616161";
	}

	render() {
		return (
			<Style>
				{`
					.card:hover {
						border-color: ${this.color};
						color: ${this.color};
					}

					.card:hover .image-container {
						border-color: ${this.color};
						background: repeating-linear-gradient(
						45deg,
						transparent,
						transparent 18px,
						${this.color} 2px,
						${this.color} 20px
						);
					}

					.card:hover .image-container img {
						border-color: ${this.color};
					}
				`}
				<div className={this.props.inverse ? "card-inverse" : "card"}>
					<div className="image-container">
						<img src={this.props.imageSrc} alt={this.props.title}/>
					</div>
					<h4>{this.props.title}</h4>
				</div>
			</Style>
		);
	}
}

export default Card;
