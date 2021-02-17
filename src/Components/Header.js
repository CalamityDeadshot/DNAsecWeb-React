import React, { Component } from 'react';

class Header extends Component {

	render() {
		return(
			<nav className="navbar">
			  <div className="container">
			    <div className="row">
			      <h1 className="name col-auto">DNAsec Web</h1>
			  
			      <ul className="links col offset-md-1 align-items-center">
			        <li className="nav-item">
			          <a className="link" target="blank" href="assets/DNAsec.apk">Download DNAsec for Android</a>
			        </li>
			        <li className="nav-item">
			          <a className="link" target="blank" href="https://github.com/CalamityDeadshot">GitHub</a>
			        </li>
			      </ul>
			
			    </div>
			  </div>      
			</nav>
		)
	}
}

export default Header;