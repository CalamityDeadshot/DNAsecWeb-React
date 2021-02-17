import React, { Component } from 'react';

class Footer extends Component {

	render() {

		return(
			<footer>
		        <div className="container">
		          <div className="row">
		            
		            <div className="col-md-6">
		              <h1 className="name name-footer col-auto">DNAsec Web</h1>
		              <p>Web Application for Solving Protein Biosynthesis problems</p>
		              <p>Author: Semyon Pyankov</p>
		            </div>
		      
		            <div className="col-md-6">
		              <h2>Contacts</h2>
		              <ul className="footer-contacts">
		                <li><a href="tg://resolve?domain=&lt;@CalamityDeadshot&gt;" className="link">Telegram</a></li>
		                <li><a href="https://vk.com/semyonpyankov" className="link">VK</a></li>
		                <li><a href="https://wa.me/79996575359" className="link">WhatsApp</a></li>
		              </ul>
		            </div>
		      
		          </div>
		        </div>
	      	</footer>
      	);
	}
}

export default Footer;