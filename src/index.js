import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "./index.css";
import App from "./Pages/App";
import Menu from "./Pages/Menu";
import Teaching from "./Pages/Teaching";
import Projects from "./Pages/Projects";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
	<Router basename={process.env.PUBLIC_URL}>
		<App>
			<Route exact path="/" component={Menu}/>
			<Route path="/teaching/:class" component={Teaching}/>
			<Route path="/projects/:type" component={Projects}/>
		</App>
	</Router>,
	document.getElementById("root"));
registerServiceWorker();
