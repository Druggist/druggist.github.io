import React from "react";
import "./Tabs.css";

class Tabs extends React.Component {
	constructor(props) {
		super(props);
		this.onTabChange = this.onTabChange.bind(this);
		this.state = {
			checked: 0
		};
	}

	onTabChange(e) {
		this.setState({checked: e.target.getAttribute("data-key")});
	}

	render() {
		let tabs = [];
		if(this.props.headers)
			for(let header in this.props.headers) {
				tabs.push(
					<div className="tab" key={header} style={{width: `${100/this.props.headers.length}%`, zIndex: `${this.state.checked == header ? 2 : 1}`}}>
						<label htmlFor={"tab" + header}>{this.props.headers[header]}</label>
						<input id={"tab" + header} name="tabs" type="radio" data-key={header} checked={this.state.checked == header ? "checked" : ""} onChange={this.onTabChange}/>
						<div style={{width: `${100 * this.props.headers.length}%`, marginLeft: `${this.state.checked == header ? -100 * header : 100}%`}}>
							{this.props.data[this.props.headers[header]]}
						</div>
					</div>
				)
			}

		return (
			<div className="tabs">
				{tabs}
			</div>
		);
	}
}

export default Tabs;