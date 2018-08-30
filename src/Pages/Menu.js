import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import HexGrid from "../Components/HexGrid/HexGrid";
import PersonalInfo from "../Components/PersonalInfo/PersonalInfo";

class Menu extends React.Component {
	render() {
		return (
			<Grid fluid>
				<Row center="xs" middle="xs">
					<Col xs={12} lg={4}>
						<PersonalInfo/>
					</Col>
					<Col xs={12} lg={8}>
						<h2>Yet another portfolio page</h2>
						<HexGrid/>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default Menu;

//<a href="https://www.freepik.com/free-vector/gamepad-background_968597.htm">Designed by Freepik</a>
//<a href="https://www.freepik.com/free-vector/colorful-education-concept-with-flat-design_2803977.htm">Designed by Freepik</a>
//<a href="https://www.freepik.com/free-vector/app-development-concept-with-flat-design_2463939.htm">Designed by Freepik</a>