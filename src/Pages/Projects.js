import React from "react";
import Section from "../Components/Section/Section";
import { Grid, Row, Col } from "react-flexbox-grid";
import Card from "../Components/Card/Card";
import Loader from "../Components/Loader/Loader";
import * as Tabletop from "tabletop";
import {Redirect, Link} from "react-router-dom";
import OnImagesLoaded from "react-on-images-loaded";

class Projects extends React.Component {
	constructor(props) {
		super(props);
		this.renderProject = this.renderProject.bind(this);
		this.renderProjectsList = this.renderProjectsList.bind(this);
		this.type = this.props.match.params.type ? this.props.match.params.type : "";
		this.color = this.type === "websites" ? "#7b1fa2" : this.type === "games" ? "#d32f2f" : this.type === "apps" ? "#689f38" : "#616161";
		this.state = {
			renderObject: "",
			showImages: false,
			title: this.props.match.params.project ? this.props.match.params.project.replace(/\++/g, String.fromCharCode(160)) : this.type
		};
	}

	renderProject(obj) {
		let colSize = Math.floor(12/obj.links.length);
		this.setState({
			title: obj.title,
			renderObject: (
				<OnImagesLoaded onLoaded={() => this.setState({showImages: true})}>
					<Grid fluid className="project">
						<Row center="xs" top="xs" around="xs">
							<Col xs={12} md={10}>
								<img src={obj.image} alt={obj.title}/>
							</Col>
						</Row>
						<Row center="xs" top="xs" around="xs">
							{
								obj.links.map(link => (
									<Col xs={12} md={Math.min(colSize, 3)} lg={Math.min(colSize, 2)}>
										<a href={link.src} className="btn" style={{background: this.color}}>{link.name}</a>
									</Col>
								))
							}
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
										<Link to={`/projects/${this.type}/${obj.title.replace(/\s+/g, '+').toLowerCase()}`}>
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
						return obj.type === this.type && obj.title.replace(/\s+/g, '+').toLowerCase() === this.props.match.params.project;
					});
					obj.cocreators = JSON.parse(obj.cocreators);
					obj.links = JSON.parse(obj.links);
					obj.technologies = JSON.parse(obj.technologies);
					this.renderProject(obj);
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
