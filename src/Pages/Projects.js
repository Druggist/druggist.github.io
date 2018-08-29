import React from "react";

class Projects extends React.Component {
	render() {
		return (
			<div className="App">
				{this.props.children}
			</div>
		);
	}
}

export default Projects;
