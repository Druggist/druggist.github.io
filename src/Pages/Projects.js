import React from "react";
import Section from "../Components/Section/Section";
import { Grid, Row, Col } from "react-flexbox-grid";
import Card from "../Components/Card/Card";
import Loader from "../Loader/Loader";
import * as Tabletop from "tabletop";
import {Redirect} from "react-router-dom";
import OnImagesLoaded from "react-on-images-loaded";

class Projects extends React.Component {
	constructor(props) {
		super(props);
		this.type = this.props.match.params.type ? this.props.match.params.type : "";
		this.color = this.type === "websites" ? "#7b1fa2" : this.type === "games" ? "#d32f2f" : this.type === "apps" ? "#689f38" : "#616161";
		this.state = {
			renderObject: "",
			showImages: false
		};
	}

	componentDidMount() {
		const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1ljZhSy9TLKDnbcKOQ1voDp-Yxu5LqF-KEkhAvrs2h74/edit?usp=sharing';
		Tabletop.init({ key: publicSpreadsheetUrl, callback: (data, tabletop) => {
			if(this.type === "websites" || this.type === "games" || this.type === "apps") {
				const data = tabletop.sheets("Projects").elements.filter((obj) => {
					return obj.type === this.type;
				});
				let elements = [];
				for(let it in data) {
					elements.push(
						<Col key={it} xs={12} sm={6} md={4}>
							<Card title={data[it].title} imageSrc={data[it].image} color={this.color}/>
						</Col>
					);
				}
				this.setState({renderObject: (
						<OnImagesLoaded onLoaded={() => this.setState({showImages: true})}>
							<Grid fluid>
								<Row center="xs" top="xs" around="xs">
									{elements}
								</Row>
							</Grid>
						</OnImagesLoaded>
					)});
			} else if(this.subject) this.setState({renderObject: <Redirect to="/"/>});
		}});
	}

	render() {
		let hiddenStyle = {height: 0, overflow: 'hidden'};
		let visibleStyle = {};
		return (
			<Section title={this.type} color={this.color}>
				<div style={this.state.showImages ? visibleStyle : hiddenStyle}>
					{this.state.renderObject}
				</div>
				<div style={this.state.showImages ? hiddenStyle : visibleStyle}>
					<Loader color={this.color}/>
				</div>
			</Section>
		);
	}
}

export default Projects;
