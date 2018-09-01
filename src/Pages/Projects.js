import React from "react";
import Section from "../Components/Section/Section";

class Projects extends React.Component {
	constructor(props) {
		super(props);
		this.type = this.props.match.params.type ? this.props.match.params.type : "";
	}


	render() {
		return (
			<Section title={this.type}>

			</Section>
		);
	}
}

export default Projects;
