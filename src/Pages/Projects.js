import React from "react";
import Section from "../Components/Section/Section";
import { Grid, Row, Col } from "react-flexbox-grid";
import Card from "../Components/Card/Card";
import Loader from "../Components/Loader/Loader";
import * as Tabletop from "tabletop";
import {Redirect, Link} from "react-router-dom";
import OnImagesLoaded from "react-on-images-loaded";
import Project from "../Components/Project/Project";

class Projects extends React.Component {
	constructor(props) {
		super(props);
		this.renderProject = this.renderProject.bind(this);
		this.renderProjectsList = this.renderProjectsList.bind(this);
		this.type = this.props.match.params.type ? this.props.match.params.type : "";
		this.color = this.type === "websites" ? "#7b1fa2" : this.type === "games" ? "#d32f2f" : this.type === "apps" ? "#689f38" : "#616161";
		this.colorDarker = this.type === "websites" ? "#4a0072" : this.type === "games" ? "#9a0007" : this.type === "apps" ? "#387002" : "#212121";
		this.state = {
			renderObject: "",
			showImages: false,
			title: this.props.match.params.project ? "" : this.type
		};
	}

	renderProject(obj) {
		this.setState({
			title: obj.title.replace(/\s+/g, String.fromCharCode(160)),
			renderObject: (
				<OnImagesLoaded onLoaded={() => this.setState({showImages: true})}>
					<Project obj={obj} color={this.color} colorDarker={this.colorDarker}/>
				</OnImagesLoaded>
			)
		});
	}

	renderProjectsList(data) {
		this.setState({
			renderObject: (
				<OnImagesLoaded onLoaded={() => this.setState({showImages: true})}>
					<Grid fluid>
						<Row center="xs" top="xs" around="xs">
							{
								data.map(obj => (
									<Col xs={12} sm={6} md={4}>
										<Link to={`/projects/${this.type}/${obj.title.replace(/\s+/g, '+').replace(/[^a-zA-Z\d_\-+]+/g, '').toLowerCase()}`}>
											<Card title={obj.title} imageSrc={obj.image} color={this.color}/>
										</Link>
									</Col>
								))
							}
						</Row>
					</Grid>
				</OnImagesLoaded>
			)
		});
	}

	componentDidMount() {
		const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1ljZhSy9TLKDnbcKOQ1voDp-Yxu5LqF-KEkhAvrs2h74/edit?usp=sharing';
		Tabletop.init({ key: publicSpreadsheetUrl, callback: (data, tabletop) => {
			if(this.type === "websites" || this.type === "games" || this.type === "apps") {
				if(this.props.match.params.project) {
					let obj = tabletop.sheets("Projects").elements.find(obj => {
						return obj.type === this.type && obj.title.replace(/\s+/g, '+').replace(/[^a-zA-Z\d_\-+]+/g, '').toLowerCase() === this.props.match.params.project;
					});
					if(obj) {
						obj.cocreators = JSON.parse(obj.cocreators);
						obj.links = JSON.parse(obj.links);
						obj.technologies = JSON.parse(obj.technologies);
						this.renderProject(obj);
					} else this.setState({renderObject: <Redirect to={`/projects/${this.type}/`}/>});
				} else {
					let data = tabletop.sheets("Projects").elements.filter(obj => obj.type === this.type);
					this.renderProjectsList(data);
				}
			} else this.setState({renderObject: <Redirect to="/"/>});
		}});
	}

	render() {
		let hiddenStyle = {height: 0, overflow: 'hidden'};
		let visibleStyle = {};
		return (
			<Section title={this.state.title} color={this.color}>
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
