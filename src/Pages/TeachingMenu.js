import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Link } from "react-router-dom";
import Card from "../Components/Card/Card";
import Section from "../Components/Section/Section";
import bdImage from "../Components/Card/images/bd.jpg";
import infImage from "../Components/Card/images/inf.jpg";

class TeachingMenu extends React.Component {
	render() {
		return (
			<Section title="teaching">
				<Grid fluid>
					<Row center="xs">
						<Col xs={12} md={6}>
							<Link to="/teaching/bazy_danych">
								<Card title="bazy danych" imageSrc={bdImage}/>
							</Link>
						</Col>
						<Col xs={12} md={6}>
							<Link to="/teaching/informatyka">
								<Card title="informatyka" imageSrc={infImage}/>
							</Link>
						</Col>
					</Row>
				</Grid>
			</Section>
		);
	}
}

export default TeachingMenu;
