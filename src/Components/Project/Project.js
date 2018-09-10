import React from "react";
import "./Project.css";
import {Col, Grid, Row} from "react-flexbox-grid";
import Style from 'style-it';

class Project extends React.Component {
	constructor(props) {
		super(props);
		this.obj = this.props.obj ? this.props.obj : {title: "", image: "", description: "", links: [], cocreators: [], technologies: []};
		this.color = this.props.color ? this.props.color : "#616161";
		this.colorDarker = this.props.colorDarker ? this.props.colorDarker : "#212121";
	}

	render() {
		return (
			<Grid fluid className="project">
				<Row center="xs" bottom="xs" around="xs">
					<Col xs={12} md={3} className="links-container">
						<Grid fluid>
							<Row start="xs" around="xs">
								<Style>
									{`
										.project .links-container a {
											border-color: ${this.color};
											color: ${this.color};
										}

										.project .links-container a:hover {
											border-color: ${this.colorDarker};
											color: ${this.colorDarker};
											background: ${this.color};
										}
									`}
								</Style>
									{
										this.obj.links.map(link => (
											<Col>
												<a href={link.src} className="btn">{link.name}</a>
											</Col>
										))
									}
							</Row>
						</Grid>
					</Col>
					<Col xs={12} md={6}>
						<div className="img-container">
							<img src={this.obj.image} alt={this.obj.title}/>
						</div>
					</Col>
					<Col xs={12} md={3} className="cocreators-container">
						{
							this.obj.cocreators.length > 0 ?
								<h3 style={{color: this.color}}>Co-creators</h3> : ""
						}
						<Style>
							{`
								.project .cocreators li:hover a {
									background: ${this.color};
									color: ${this.colorDarker};
									border-color: ${this.colorDarker};
								}
							`}
							<ul className="cocreators">
								{this.obj.cocreators.map(c => <li><a href={c.src} target="_blank">{c.name}</a></li>)}
							</ul>
						</Style>
					</Col>
				</Row>

				<Row center="xs" top="xs" around="xs">
					<Col xs={12} md={9}>
						<h3 style={{color: this.color}}>Description</h3>
						<p>{this.obj.description}</p>
					</Col>
					<Col xs={12} md={3}>
						<h3 style={{color: this.color}}>Technologies</h3>
						<ul className="technologies">
							{this.obj.technologies.map(t => <li>{t}</li>)}
						</ul>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default Project;
