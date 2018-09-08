import React from "react";
import Section from "../Components/Section/Section";
import { Grid, Row, Col } from "react-flexbox-grid";
import Card from "../Components/Card/Card";
import Loader from "../Components/Loader/Loader";
import * as Tabletop from "tabletop";
import {Redirect} from "react-router-dom";
import OnImagesLoaded from "react-on-images-loaded";

class Projects extends React.Component {
	constructor(props) {
		super(props);
		this.onProjectClick = this.onProjectClick.bind(this);
		this.type = this.props.match.params.type ? this.props.match.params.type : "";
		this.color = this.type === "websites" ? "#7b1fa2" : this.type === "games" ? "#d32f2f" : this.type === "apps" ? "#689f38" : "#616161";
		this.state = {
			items: [],
			cards: "",
			project: "",
			showImages: false,
			isProjectOpen: false,
			title: this.type
		};
	}

	onProjectClick(e) {
		e.preventDefault();
		let obj = this.state.items[e.currentTarget.dataset.key];
		let links = [];
		let colSize = Math.floor(12/obj.links.length);
		for(let it in obj.links) {
			links.push(
				<Col xs={12} md={Math.min(colSize, 3)} lg={Math.min(colSize, 2)}>
					<a href={obj.links[it].src} className="btn" style={{background: this.color}}>{obj.links[it].name}</a>
				</Col>
			);
		}

		this.setState({
			title: obj.title,
			isProjectOpen: true,
			project: (
				<Grid fluid className="project">
					<Row center="xs" top="xs" around="xs">
						<Col xs={12} md={10}>
							<img src={obj.image} alt={obj.title}/>
						</Col>
					</Row>
					<Row center="xs" top="xs" around="xs">
						{links}
					</Row>
					<Row center="xs" top="xs" around="xs">
						<Col xs={12} md={3}>
							<ul>
								{obj.cocreators.map(c => <li><a href={c.src}>{c.name}</a></li>)}
							</ul>
						</Col>
						<Col xs={12} md={6}>
							<p>{obj.description}</p>
						</Col>
						<Col xs={12} md={3}>
							<ul>
								{obj.technologies.map(t => <li>{t}</li>)}
							</ul>
						</Col>
					</Row>
				</Grid>
			)
		});
	}

	componentDidMount() {
		const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1ljZhSy9TLKDnbcKOQ1voDp-Yxu5LqF-KEkhAvrs2h74/edit?usp=sharing';
		Tabletop.init({ key: publicSpreadsheetUrl, callback: (data, tabletop) => {
			if(this.type === "websites" || this.type === "games" || this.type === "apps") {
				let data = tabletop.sheets("Projects").elements.filter((obj) => {
					return obj.type === this.type;
				});

				let elements = [];
				for(let it in data) {
					elements.push(
						<Col key={it} xs={12} sm={6} md={4}>
							<a href="#!" data-key={it} onClick={this.onProjectClick}>
								<Card title={data[it].title} imageSrc={data[it].image} color={this.color}/>
							</a>
						</Col>
					);
					data[it].technologies = JSON.parse(data[it].technologies);
					data[it].cocreators = JSON.parse(data[it].cocreators);
					data[it].links = JSON.parse(data[it].links);
				}
				this.setState({
					items: data,
					cards: (
						<OnImagesLoaded onLoaded={() => this.setState({showImages: true})}>
							<Grid fluid>
								<Row center="xs" top="xs" around="xs">
									{elements}
								</Row>
							</Grid>
						</OnImagesLoaded>
					)});
			} else if(this.subject) this.setState({cards: <Redirect to="/"/>});
		}});
	}

	render() {
		let hiddenStyle = {height: 0, overflow: 'hidden'};
		let visibleStyle = {};
		return (
			<Section title={this.state.title} color={this.color}>
				{
					this.state.isProjectOpen ?
						<div style={this.state.isProjectOpen ? visibleStyle : hiddenStyle}>
							{this.state.project}
						</div>
					:
						<div style={this.state.showImages ? visibleStyle : hiddenStyle}>
							{this.state.cards}
						</div>
				}

				<div style={this.state.showImages ? hiddenStyle : visibleStyle}>
					<Loader color={this.color}/>
				</div>

			</Section>
		);
	}
}

export default Projects;
