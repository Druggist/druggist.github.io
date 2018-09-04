import React from "react";
import {Redirect} from "react-router-dom";
import * as Tabletop from "tabletop";
import { Grid, Row, Col } from "react-flexbox-grid";
import Exercises from "../Components/Exercises/Exercises";
import Tabs from "../Components/Tabs/Tabs";
import Section from "../Components/Section/Section";
import Loader from "../Loader/Loader";

class Teaching extends React.Component {
	constructor(props) {
		super(props);
		this.color = "#ffa000";
		this.subject = props.match.params.subject ? props.match.params.subject.replace("_", String.fromCharCode(160)) : undefined;
		this.state = {
			showLoader: true,
			renderObject: ""
		};
	}

	componentDidMount() {
		const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1ljZhSy9TLKDnbcKOQ1voDp-Yxu5LqF-KEkhAvrs2h74/edit?usp=sharing';
		Tabletop.init({ key: publicSpreadsheetUrl, callback: (data, tabletop) => {
				if(this.subject === "informatyka" || this.subject === "bazy" + String.fromCharCode(160) + "danych") {
					const data = tabletop.sheets("Teaching").elements.filter((obj) => {
						return obj.subject === this.subject.replace(String.fromCharCode(160), " ");
					});
					const classes = data.map(obj => obj.class).filter((obj, i, arr) => arr.indexOf(obj) === i);

					let tabs = [];
					for(let cl in classes) {
						const sections = data.filter(obj => obj.class === classes[cl]).map(obj => obj.section).filter((obj, i, arr) => arr.indexOf(obj) === i);
						let exercises = [];
						for (let section in sections) {
							const sectionData = data.filter(obj => obj.class === classes[cl] && obj.section === sections[section]);
							exercises.push(
								<Col xs={12} md={6} lg={4} key={section}>
									<Exercises title={sections[section]} data={sectionData}/>
								</Col>
							);
						}

						tabs[classes[cl]] = (
							<Grid fluid>
								<Row top="xs" center="xs" around="xs">
									{this.state.loader}
									{exercises}
								</Row>
							</Grid>
						);
					}
					this.setState({renderObject: <Tabs headers={classes} data={tabs}/>, showLoader: false});
				} else this.setState({renderObject: <Redirect to="/teaching"/>});
		}});
	}

	render() {
		let hiddenStyle = {height: 0, overflow: 'hidden'};
		let visibleStyle = {};

		return (
			<Section title={this.subject} color={this.color}>
				<div style={this.state.showLoader ? hiddenStyle : visibleStyle}>
					{this.state.renderObject}
				</div>
				<div style={this.state.showLoader ? visibleStyle : hiddenStyle}>
					<Loader color={this.color}/>
				</div>
			</Section>
		);
	}
}

export default Teaching;
