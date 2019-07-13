import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			info: {}
		};
	}
	componentDidMount() {
		axios.get('/data').then(res => {
			this.setState({ info: res.data });
		});
	}

	render() {
		return <div>hello {this.state.info.user}</div>;
	}
}

export default App;
