import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';

const DefaultTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#E04F60",
    color: '#fff',
    boxShadow: theme.shadows[3],
    fontSize: 16,
  },
}))(Tooltip);

class codonPair extends Component {

	constructor() {
		super();

		this.state = {
			open: false
		}

		this.handleTooltipClose = this.handleTooltipClose.bind(this);
		this.handleTooltipOpen = this.handleTooltipOpen.bind(this);
		this.setOpen = this.setOpen.bind(this);
	}

	setOpen(opened) {
		this.setState({
			open: opened
		});
	}

	handleTooltipClose() {
	    this.setOpen(false);
	}

	handleTooltipOpen() {
		this.setOpen(true);
	}
	
	render() {

		const f = this.props.firstNucleotide;
		let className_1;
		let className_2;
		let tooltipText;

		if (f === "A") {
			className_1 = "nucleotide nucleotide_1 adenine-left";
			className_2 = "nucleotide nucleotide_2 thymine-uracil-right";
			tooltipText = "Adenine is complementary to uracil";
		} else if (f === "T" || f === "U") {
			className_1 = "nucleotide nucleotide_1 thymine-uracil-left";
			className_2 = "nucleotide nucleotide_2 adenine-right";
			if (f === "T") {
				tooltipText = "Thymine is complementary to adenine";
			} else {
				tooltipText = "Uracil is complementary to adenine";
			}
		} else if (f === "G") {
			className_1 = "nucleotide nucleotide_1 guanine-left";
			className_2 = "nucleotide nucleotide_2 cytosine-right";
			tooltipText = "Guanine is complementary to cytosine";
		} else if (f === "C") {
			className_1 = "nucleotide nucleotide_1 cytosine-left";
			className_2 = "nucleotide nucleotide_2 guanine-right";
			tooltipText = "Cytosine is complementary to guanine";
		}

		

		return (
			<ClickAwayListener onClickAway={this.handleTooltipClose}>
				<div>
					<DefaultTooltip
		                PopperProps={{
		                  disablePortal: true,
		                }}
		                onClose={this.handleTooltipClose}
		                open={this.state.open}
		                disableFocusListener
		                disableHoverListener
		                disableTouchListener
		                title={tooltipText}
		              >
						<div className="pair" onClick={this.handleTooltipOpen}>
							<div className="pair-container">
								<div className={className_1}><span>{this.props.firstNucleotide}</span></div>
								<div className="nucl-connecter nucl-connecter_1" style={{display: f === "A" || f === "T" || f === "U" ? "none" : "initial"}}></div>
								<div className="nucl-connecter nucl-connecter_2" style={{display: !(f === "A") && !(f === "T") && !(f === "U") ? "none" : "initial"}}></div>
								<div className="nucl-connecter nucl-connecter_3" style={{display: f === "A" || f === "T" || f === "U" ? "none" : "initial"}}></div>
								<div className="nucl-connecter nucl-connecter_4" style={{display: !(f === "A") && !(f === "T") && !(f === "U") ? "none" : "initial"}}></div>
								<div className="nucl-connecter nucl-connecter_5" style={{display: f === "A" || f === "T" || f === "U" ? "none" : "initial"}}></div>
								<div className={className_2}><span>{this.props.secondNucleotide}</span></div>
							</div>
						</div>
					</DefaultTooltip>
				</div>
			</ClickAwayListener>
		);
	}
}

export default codonPair;