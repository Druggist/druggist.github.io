import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "./index.css";
import App from "./Pages/App";
import Menu from "./Pages/Menu";
import Teaching from "./Pages/Teaching";
import TeachingMenu from "./Pages/TeachingMenu";
import Projects from "./Pages/Projects";

ReactDOM.render(
	<Router basename={process.env.PUBLIC_URL}>
		<App>
			<Route exact path="/" component={Menu}/>
			<Route exact path="/teaching" component={TeachingMenu}/>
			<Route exact path="/teaching/:subject" component={Teaching}/>
			<Route exact path="/projects/:type" component={Projects}/>
			<Route exact path="/projects/:type/:project" component={Projects}/>
		</App>
	</Router>,
	document.getElementById("root"));
