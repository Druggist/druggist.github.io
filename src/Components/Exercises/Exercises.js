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
								<a href={obj.link} target="_blank" rel="noopener noreferrer">{obj.name}</a>
							</li>
						);
					}) : []}
				</ul>
			</div>
		);
	}
}

export default Exercises;
