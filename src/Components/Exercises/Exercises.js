import React from "react";
import "./Exercises.css";

class Exercises extends React.Component {
	render() {
		return (
			<div className="exercises">
				<h3>{this.props.title ? this.props.title : ""}</h3>
				<ul>
					{this.props.data ? this.props.data.map((obj, i) => {
						return	(
							<li key={i}>
								<a href={obj.src} target="_blank">{obj.name}</a>
							</li>
						);
					}) : []}
				</ul>
			</div>
		);
	}
}

export default Exercises;
