import React from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import { Textfit } from "react-textfit";
import "./Section.css";

class Section extends React.Component {
	constructor(props) {
		super(props);
		this.color = props.color ? props.color : "#616161";
	}

	render() {
		return (
			<Grid fluid>
				<Row middle="xs">
					<Col xs={12} lg={1}>
						<Textfit mode="multi" className="text-fit" style={{color: this.color}} max={2000}>
							{this.props.title}
						</Textfit>
					</Col>
					<Col xs={12} lg={11}>
						{this.props.children}
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default Section;