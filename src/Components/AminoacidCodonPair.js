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

const phenylalanine = "Phenylalanine";
const leucine = "Leucine";
const isoleucine = "Isoleucine";
const methionine = "Methionine";
const valine = "Valine";
const serine = "Serine";
const proline = "Proline";
const threonine = "Threonine";
const tyrosine = "Tyrosine";
const alanine = "Alanine";
const stop = "Stop codon";
const histidine = "Histidine";
const glutamine = "Glutamine";
const asparagine = "Asparagine";
const lysine = "Lysine";
const aspartic_acid = "Aspartic acid";
const glutamine_acid = "Glutamine acid";
const cysteine = "Cysteine";
const tryptophan = "Tryptophan";
const arginine = "Arginine";
const glycine = "Glycine";

const phenylalanine_short = "Phe";
const leucine_short = "Leu";
const isoleucine_short = "Ile";
const methionine_short = "Met";
const valine_short = "Val";
const serine_short = "Ser";
const proline_short = "Pro";
const threonine_short = "Thr";
const tyrosine_short = "Tyr";
const alanine_short = "Ala";
const stop_short = "———";
const histidine_short = "His";
const glutamine_short = "Gln";
const asparagine_short = "Arg";
const lysine_short = "Lys";
const aspartic_acid_short = "Asp";
const glutamine_acid_short = "Glu";
const cysteine_short = "Cys";
const tryptophan_short = "Trp";
const arginine_short = "Arg";
const glycine_short = "Gly";

class aminoAcidCodonPair extends Component {

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

		const codon = this.props.codon;
		let className = [];
		const aminoAcid = this.props.aminoAcid;
		let tooltipText;

		for (let i = 0; i < 3; i++ ) {
			if (codon[i] === "A") {
				className[i] = "nucleotide AA-nucleotide nucleotide_1 adenine-left";
			} else if (codon[i] === "T" || codon[i] === "U") {
				className[i] = "nucleotide AA-nucleotide nucleotide_1 thymine-uracil-left";
			} else if (codon[i] === "G") {
				className[i] = "nucleotide AA-nucleotide nucleotide_1 guanine-left";
			} else if (codon[i] === "C") {
				className[i] = "nucleotide AA-nucleotide nucleotide_1 cytosine-left";
			}
		}

		if (aminoAcid === phenylalanine_short) {
		    tooltipText = phenylalanine;
		} else if (aminoAcid === leucine_short) {
		    tooltipText = leucine;
		} else if (aminoAcid === isoleucine_short) {
		    tooltipText = isoleucine;
		} else if (aminoAcid === methionine_short) {
		    tooltipText = methionine;
		} else if (aminoAcid === valine_short) {
		    tooltipText = valine;
		} else if (aminoAcid === serine_short) {
		    tooltipText = serine;
		} else if (aminoAcid === proline_short) {
		    tooltipText = proline;
		} else if (aminoAcid === threonine_short) {
		    tooltipText = threonine;
		} else if (aminoAcid === tyrosine_short) {
		    tooltipText = tyrosine;
		} else if (aminoAcid === alanine_short) {
		    tooltipText = alanine;
		} else if (aminoAcid === stop_short) {
		    tooltipText = stop;
		} else if (aminoAcid === histidine_short) {
		    tooltipText = histidine;
		} else if (aminoAcid === glutamine_short) {
		    tooltipText = glutamine;
		} else if (aminoAcid === asparagine_short) {
		    tooltipText = asparagine;
		} else if (aminoAcid === lysine_short) {
		    tooltipText = lysine;
		} else if (aminoAcid === aspartic_acid_short) {
		    tooltipText = aspartic_acid;
		} else if (aminoAcid === glutamine_acid_short) {
		    tooltipText = glutamine_acid;
		} else if (aminoAcid === cysteine_short) {
		    tooltipText = cysteine;
		} else if (aminoAcid === tryptophan_short) {
		    tooltipText = tryptophan;
		} else if (aminoAcid === arginine_short) {
		    tooltipText = arginine;
		} else if (aminoAcid === glycine_short) {
		    tooltipText = glycine;
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
						<div className="pair AA-pair" onClick={this.handleTooltipOpen}>
							<div className="AA-pair-container">
								<div className="AA-codon">
									<div className={className[0]}><span>{codon[0]}</span></div>
									<div className={className[1]}><span>{codon[1]}</span></div>
									<div className={className[2]}><span>{codon[2]}</span></div>
								</div>
								<div className="AA-name"><span>{this.props.aminoAcid}</span></div>
							</div>
						</div>
					</DefaultTooltip>
				</div>
			</ClickAwayListener>
		);
	}
}

export default aminoAcidCodonPair;