import React from "react";
import {Redirect} from "react-router-dom";
import { Grid, Row, Col } from "react-flexbox-grid";
import Exercises from "../Components/Exercises/Exercises";
import Tabs from "../Components/Tabs/Tabs";

const API = "https://sheets.googleapis.com/v4/spreadsheets/1ljZhSy9TLKDnbcKOQ1voDp-Yxu5LqF-KEkhAvrs2h74/values:batchGet?ranges=Teaching&majorDimension=ROWS&key=AIzaSyAHc6sDE6-VlK2Ux9CC21L8j-McK9LEZUo";

class Teaching extends React.Component {
	constructor(props) {
		super(props);
		this.subject = props.match.params.subject;
		this.state = {
			items: []
		};
	}

	componentDidMount() {
		fetch(API).then(response => response.json()).then(data => {
			let batchRowValues = data.valueRanges[0].values;

			const rows = [];
			for (let i = 1; i < batchRowValues.length; i++) {
				let rowObject = {};
				for (let j = 0; j < batchRowValues[i].length; j++) {
					rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
				}
				rows.push(rowObject);
			}

			this.setState({ items: rows });
		});

	}

	render() {
		let renderObject = "";
		if(this.subject === "informatyka" || this.subject === "bazy danych") {
			const data = this.state.items.filter((obj) => {
				return obj.subject === this.subject;
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
						<Row center="xs">
							{exercises}
						</Row>
					</Grid>
				);
			}
			renderObject = <Tabs headers={classes} data={tabs}/>;

		} else if(this.subject) renderObject = <Redirect to="/teaching"/>;
		console.log(renderObject);
		return (
			<div>
				{renderObject}
			</div>
		);
	}
}

export default Teaching;
