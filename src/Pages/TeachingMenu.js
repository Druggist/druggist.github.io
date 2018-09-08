import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Link } from "react-router-dom";
import Card from "../Components/Card/Card";
import Section from "../Components/Section/Section";
import bdImage from "../Components/Card/images/bd.jpg";
import infImage from "../Components/Card/images/inf.jpg";
import OnImagesLoaded from "react-on-images-loaded";
import Loader from "../Components/Loader/Loader";

class TeachingMenu extends React.Component {
	constructor(props) {
		super(props);
		this.color = "#ffa000";
		this.state = {
			showImages: false
		}
	}
	render() {
		let hiddenStyle = {height: 0, overflow: 'hidden'};
		let visibleStyle = {};

		return (
			<Section title="teaching" color={this.color}>
				<div style={this.state.showImages ? visibleStyle : hiddenStyle}>
					<OnImagesLoaded onLoaded={() => this.setState({showImages: true})}>
						<Grid fluid>
							<Row center="xs" around="xs">
								<Col xs={12} md={5}>
									<Link to="/teaching/bazy_danych">
										<Card title="bazy danych" imageSrc={bdImage} color={this.color}/>
									</Link>
								</Col>
								<Col xs={12} md={5}>
									<Link to="/teaching/informatyka">
										<Card title="informatyka" imageSrc={infImage} color={this.color}/>
									</Link>
								</Col>
							</Row>
						</Grid>
					</OnImagesLoaded>
				</div>
				<div style={this.state.showImages ? hiddenStyle : visibleStyle}>
					<Loader color={this.color}/>
				</div>
			</Section>
		);
	}
}

export default TeachingMenu;
