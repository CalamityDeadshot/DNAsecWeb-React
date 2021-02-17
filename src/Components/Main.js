import React, { Component } from 'react';
import Input from './Input';
import Explanation from './Explanation';
import Header from './Header';
import Footer from './Footer';
import { Route, Switch, withRouter } from "react-router-dom";

class Main extends Component {

	constructor() {
		super();

		this.state = {
			initialSequence: null,
			input: null,
			firstResult: null,
			secondResult: null,
			thirdResult: null,
			DNAisMatrix: false,
		}

		this.updateState = this.updateState.bind(this);
	}

	updateState(initSeq, input, result_1, result_2, result_3, matrix) {
		this.state.initialSequence = initSeq;
		this.state.input = input;
		this.state.firstResult = result_1;
		this.state.secondResult = result_2;
		this.state.thirdResult = result_3;
		this.state.DNAisMatrix = matrix;

	}


	render() {
		return (
		  <div>
	    	<Header/>
	    	
	    	
			<div className="container main-content">
				<Switch>
		    		<Route path="/Explanation" component={() => <Explanation state={this.state} />} />
					<Route expact path='' component = {() => <Input state={this.state} updateState = {this.updateState} />} />
				</Switch>
			</div>
	    	
	    	
	    	<Footer/>
		  </div>
		);

	}
}

export default withRouter(Main);