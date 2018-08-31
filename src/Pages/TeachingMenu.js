import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import Card from "../Components/Card/Card";

class TeachingMenu extends React.Component {
	render() {
		return (
			<div className="App">
				{this.props.children}
			</div>
		);
	}
}

export default TeachingMenu;
