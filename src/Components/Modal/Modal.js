import React from "react";
import "./Modal.css";

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.color = this.props.color ? this.props.color : "#616161";
		this.data = this.props.data ? this.props.data : {title: "", type: "", description: "", image: "", cocreators: "[]", links: "[]", technologies: "[]"};
		this.data.technologies = JSON.parse(this.data.technologies);
		this.data.cocreators = JSON.parse(this.data.cocreators);
		this.data.links = JSON.parse(this.data.links);
	}

	render() {

		return (
			<div>
			</div>
		);
	}
}

export default Modal;
