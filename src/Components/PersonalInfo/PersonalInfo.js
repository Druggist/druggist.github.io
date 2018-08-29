import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import "./PersonalInfo.css";
import DruggistImg from "./images/druggist.png";

class PersonalInfo extends React.Component {
	render() {
		return (
			<Grid fluid id="personal-info">
				<Row center="xs" middle="xs">
					<Col xs={12}>
						<img src={DruggistImg} alt="druggist"/>
						<h1>sir Druggist</h1>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default PersonalInfo;
