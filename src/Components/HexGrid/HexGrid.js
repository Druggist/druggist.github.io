import React from "react";
import {Link} from "react-router-dom";
import "./HexGrid.css";
import  GamesImg from "./images/games.png";
import  TeachingImg from "./images/teaching.png";
import  WebImg from "./images/web.png";
import  AppsImg from "./images/apps.png";
import  SourcesImg from "./images/sources.png";

class HexGrid extends React.Component {
	constructor(props) {
		super(props);
		this.triggerHexAnimation = this.triggerHexAnimation.bind(this);
	}

	componentDidMount() {
		this.triggerHexAnimation();
	}

	triggerHexAnimation() {
		let hexes = document.querySelectorAll(".hex:not(.disabled)");
		let hex = hexes[Math.floor(Math.random() * hexes.length)];
		setTimeout(() => {
			if(hex && !hex.matches(":hover")) {
				hex.style.animation = "none";
				hex.offsetHeight;
				hex.style.animation = "hex-bounce 1s linear 1";
			}
			this.triggerHexAnimation();
		}, Math.floor((Math.random() * 7500) + 2500));
	}

	render() {
		return (
			<ul id="hexGrid">
				<li className={"hex disabled"}>
					<div className="hexIn">
						<Link className="hexLink" to="/projects/websites" style={{color: "#4a0072", background: "#7b1fa2"}}>
							<h1>Websites</h1>
							<img src={WebImg} alt="websites"/>
						</Link>
					</div>
				</li>
				<li className={"hex disabled"}>
					<div className="hexIn">
						<Link className="hexLink" to="/projects/games" style={{color: "#9a0007", background: "#d32f2f"}}>
							<h1>Games</h1>
							<img src={GamesImg} alt="games"/>
						</Link>
					</div>
				</li>
				<li className={"hex disabled"}>
					<div className="hexIn">
						<Link className="hexLink" to="/projects/apps" style={{color: "#387002", background: "#689f38"}}>
							<h1>Apps</h1>
							<img src={AppsImg} alt="apps"/>
						</Link>
					</div>
				</li>
				<li className="hex">
					<div className="hexIn">
						<a className="hexLink" href="https://github.com/Druggist" style={{color: "#005b9f", background: "#0288d1"}}>
							<h1>Sources</h1>
							<img src={SourcesImg} alt="sources"/>
						</a>
					</div>
				</li>
				<li className="hex">
					<div className="hexIn">
						<Link className="hexLink" to="/teaching" style={{color: "#bb4d00", background: "#ffa000"}}>
							<h1>Teaching</h1>
							<img src={TeachingImg} alt="teaching"/>
						</Link>
					</div>
				</li>
			</ul>
		);
	}
}

export default HexGrid;
