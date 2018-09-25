import React from "react";
import "./Tabs.css";

class Tabs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: "0"
		};
	}

	render() {
		let tabs = [];
		if(this.props.headers)
			if(this.props.headers.length === 1 && this.props.headers[0] === "") {
				tabs.push(
					<div className="tab" key={0} style={{width: "100%", zIndex: "2"}}>
						<div style={{width: "100%", marginLeft: "0"}}>
							{this.props.data[this.props.headers[0]]}
						</div>
					</div>
				)
			} else {
				for (let header in this.props.headers) {
					tabs.push(
						<div className="tab" key={header} style={{
							width: `${100 / this.props.headers.length}%`,
							zIndex: `${this.state.checked === header ? 2 : 1}`
						}}>
							<input id={"tab" + header} name="tabs" type="radio" data-key={header} checked={this.state.checked === header ? "checked" : ""} onChange={(e) => {this.setState({checked: e.target.getAttribute("data-key")});}}/>
							<label htmlFor={"tab" + header}>{this.props.headers[header]}</label>
							<div style={{
								width: `${100 * this.props.headers.length}%`,
								marginLeft: `${this.state.checked === header ? -100 * header : 100}%`
							}}>
								{this.props.data[this.props.headers[header]]}
							</div>
						</div>
					)
				}
			}

		return (
			<div className="tabs">
				{tabs}
			</div>
		);
	}
}

export default Tabs;