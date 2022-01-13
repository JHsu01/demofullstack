import "./App.css";
import { Switch, Route } from "react-router";
import Landing from "./pages/Landing";

/* TODO: Import the auth and list context providers from their respective files */





function App() {
	return (
		<div className="App">
		
				

			<Switch>
				<Route path="/" exact component={Landing} />

			</Switch>
		
			
		</div>
	);
}

export default App;
