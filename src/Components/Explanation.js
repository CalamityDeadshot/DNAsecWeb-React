import React, { Component } from 'react';
import Waves from 'node-waves/dist/waves.min.js';
import * as Res from "../shared/resourses.js";
import Pair from './CodonPair';
import AminoAcidPair from './AminoacidCodonPair';
import { Link } from 'react-router-dom';

function parseTRNA(tRNA) {
	const sequencePre = tRNA.split("; ");
	
	let sequence ="";
	sequencePre.forEach((elem) => {
		sequence += elem;
	});

	return(sequence.split(""));
}

function RenderFirstPairs({props}) {

	const initialSequenceArr = props.input.split("");
	const firstResultArr = props.firstResult.split("");

	const pairs_1 = initialSequenceArr.map((elem, i) => {
		return(
			<Pair key={i}
				firstNucleotide={elem}
				secondNucleotide={firstResultArr[i]} />
		);
	});

	return (
		<div className="pairs-container">
			{pairs_1}
		</div>
	);

}

function RenderSecondPairs({props}) {

	const firstResultArr = props.firstResult.split("");

	if (props.initialSequence === "DNA" || props.initialSequence === "mRNA") {
	
		const secondResultArr = parseTRNA(props.secondResult);

		const pairs_1 = firstResultArr.map((elem, i) => {
			return(
				<Pair key={i}
					firstNucleotide={elem}
					secondNucleotide={secondResultArr[i]} />
			);
		});

		return (
			<div className="pairs-container">
				{pairs_1}
			</div>
		);

	} else {
		const secondResultArr = props.secondResult.split("");

		const pairs_1 = firstResultArr.map((elem, i) => {
			return(
				<Pair key={i}
					firstNucleotide={elem}
					secondNucleotide={secondResultArr[i]} />
			);
		});

		return (
			<div className="pairs-container">
				{pairs_1}
			</div>
		);
	}

}

function RenderAminoAcidPairs({props}) {
	let codons;
	let aminoAcids = props.thirdResult.split("-");

	if (props.initialSequence === "DNA") {
		codons = props.firstResult.match(/.{1,3}/g);
	} else if (props.initialSequence === "mRNA") {
		codons = props.input.match(/.{1,3}/g);
	} else if (props.initialSequence === "tRNA") {
		codons = props.secondResult.match(/.{1,3}/g);
	}
	
	const pairs = codons.map((codon, i) => {
		return(
			<AminoAcidPair key = {i}
				codon={codon}
				aminoAcid={aminoAcids[i]} />
		);
	})

	return(
		<div className="pairs-container">
			{pairs}
		</div>
	);

}

class Explanation extends Component {

	constructor(props) {
		super(props);

		this.parseTRNA = this.parseTRNA.bind(this);
	}

	parseTRNA(tRNA) {
		const sequencePre = tRNA.split("; ");
		
		let sequence ="";
		sequencePre.forEach((elem) => {
			sequence += elem;
		});

		return(sequence.split(""));
	}

	componentDidMount() {

		
		const explanationTexts = document.querySelectorAll('.explanation-text');
		const to_1 = document.querySelector('.to-1');
		const from_1 = document.querySelector('.from-1');
		const to_2 = document.querySelector('.to-2');
		const from_2 = document.querySelector('.from-2');
		const to_3 = document.querySelector('.to-3');
		const from_3 = document.querySelector('.from-3');

		Waves.attach('.pair', ['waves-classic', 'waves-primary']);
		Waves.init();

		if (this.props.state.initialSequence === "DNA") {
			if (this.props.state.DNAisMatrix) {
				for (let i = 0; i < explanationTexts.length; i++) {
					explanationTexts[i].innerHTML = Res.explanationForMatrixDNA[i];
				}
			} else {
				for (let i = 0; i < explanationTexts.length; i++) {
					explanationTexts[i].innerHTML = Res.explanationForDNA[i];
				}
			}

			from_1.textContent = "DNA";
			to_1.textContent = "mRNA";
			from_2.textContent = "mRNA";
			to_2.textContent = "tRNA";
			from_3.textContent = "mRNA";
			to_3.textContent = "AA";
			

		} else if (this.props.state.initialSequence === "mRNA") {
			for (let i = 0; i < explanationTexts.length; i++) {
				explanationTexts[i].innerHTML = Res.explanationForMRNA[i];
			}

			from_1.textContent = "mRNA";
			to_1.textContent = "DNA";
			from_2.textContent = "mRNA";
			to_2.textContent = "tRNA";
			from_3.textContent = "mRNA";
			to_3.textContent = "AA";
		} else if (this.props.state.initialSequence === "tRNA") {
			for (let i = 0; i < explanationTexts.length; i++) {
				explanationTexts[i].innerHTML = Res.explanationForTRNA[i];
			}
			from_1.textContent = "tRNA";
			to_1.textContent = "mRNA";
			from_2.textContent = "mRNA";
			to_2.textContent = "DNA";
			from_3.textContent = "mRNA";
			to_3.textContent = "AA";
		}
	}

	render() {

		

		// let s = this.props.state;
		// s.initialSequence = "DNA";
		// s.input = "ATG";
		// s.firstResult = "UAC";
		// s.secondResult = "AUG";
		// s.thirdResult = "Tyr-";

		if (this.props.state.input == null) {
			return(
				<div className="row row-content">
					<div className="AA-codon col-12">
						<div className="m-3">
							<p style={{width: "100%"}}>Do not reload the application if you do not want to loose your input.</p>
							<p>Now try going back to <Link to="/">main page</Link></p>
						</div>
					</div>
				</div>
			);
		} 

		return(
			<React.Fragment>
				<div className="row row-content">
					<Link to="./">
						<button className="waves-effect waves-classic waves-primary waves-circle back-btn"></button>
					</Link>
				</div>
				<div className="row row-content align-items-center justify-content-start">
					<div className="col-auto"><h2><strong>Initial sequence:</strong> {this.props.state.initialSequence}</h2></div>
				</div>
				
				<div className="row row-content justify-content-around">
					<div className="explanation-item col-lg-4 col-sm-6 col-12">
						<p className="explanation-text explanation-text-0"></p>
						<div className="justify-content-center" style={{display: "flex"}}>
							<span className="grey-text from from-1 align-self-left"></span>
							<span className="arrow-right"></span>
							<span className="grey-text to to-1 align-self-right"></span>
						</div>

						<RenderFirstPairs props = {this.props.state} />
					</div>
					<div className="explanation-item col-lg-4 col-sm-6 col-12">
						<p className="explanation-text explanation-text-1"></p>
						<div className="justify-content-center" style={{display: "flex"}}>
							<span className="grey-text from from-2 align-self-left">mRNA</span><br/>
							<span className="arrow-right"></span><br/>
							<span className="grey-text to to-2 align-self-right">tRNA</span>
						</div>

						<RenderSecondPairs props = {this.props.state} />
					</div>
					<div className="explanation-item col-lg-4 col-sm-6 col-12">
						<p className="explanation-text explanation-text-2"></p>
						<div className="justify-content-center" style={{display: "flex"}}>
							<span className="grey-text from from-3 align-self-left">mRNA</span>
							<span className="arrow-right"></span>
							<span className="grey-text to to-3 align-self-right">AA</span>
						</div>

						<RenderAminoAcidPairs props = {this.props.state} />

					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Explanation;