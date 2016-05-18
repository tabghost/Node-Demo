import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Test extends Component {
	handleClick() {
		console.log('test success!');
	}
	render() {
		return(
			<div onClick={this.handleClick}>just a test</div>
		)
	}
}

ReactDOM.render(<Test/>, document.getElementById('test'));