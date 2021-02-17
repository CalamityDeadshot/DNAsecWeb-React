import React, { Component } from 'react';
import Waves from 'node-waves/dist/waves.min.js';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// import genome_table from './genome_table_eng.jpg';

let initialSequence;
let input;
let firstResult;
let secondResult;
let thirdResult;
let DNAisMatrix;


class Input extends Component {

	
	componentDidMount() {
		
		let that = this;

		const adenineBtn = document.querySelector('.btn-adenine');
		const thymineBtn = document.querySelector('.btn-thymine');
		const guanineBtn = document.querySelector('.btn-guanine');
		const cytosineBtn = document.querySelector('.btn-cytosine');
		const eraseBtn = document.querySelector('.btn-erase');
		const clearBtn = document.querySelector('.btn-clear');
		const sequenceContainer = document.querySelector('.input-sequence');
		const beforeEnteringText = document.querySelector('.before_entering_text');
		const spinner = document.querySelector('#sequence-type');
		const customCheckboxContainer = document.querySelector(".custom-checkbox-container");
		const DnaIsMatrixCheckbox = document.querySelector("#DNA-is-matrix");
		const navbar = document.querySelector(".navbar");

		const explanationBtn = document.querySelector(".expl-btn");

		const firstResultHead = document.querySelector('#result-head_1');
		const firstResultField = document.querySelector('#result_1');

		const secondResultHead = document.querySelector('#result-head_2');
		const secondResultField = document.querySelector('#result_2');

		const thirdResultField = document.querySelector('#result_3');

		Waves.attach('.input-btn', ['waves-float']);
		Waves.attach('.ripple');
		Waves.attach('.accordion-btn');
		Waves.init();
		function performClick(element) {
		  Waves.ripple(element);
		}

		const INCOMPLETE_SEQUENCE = "Attention: incomplete sequence"
		const ID_DNA = 0;
		const ID_mRNA = 1;
		const ID_tRNA = 2;
		const ADENINE = "A";
		const URACIL = "U";
		const GUANINE = "G";
		const CYTOSINE = "C";

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


		const inputButtons = [
		  adenineBtn,
		  thymineBtn,
		  guanineBtn,
		  cytosineBtn
		];

		const allCodonTextFields = [
		  sequenceContainer,
		  firstResultField,
		  secondResultField,
		  thirdResultField
		];

		const allResultTextFields = [
		  firstResultField,
		  secondResultField,
		  thirdResultField
		];

		let count = 0;
		let color_index = 0;
		let initialSequenseSpan = "";
		let lastCodon = "";
		let firstResultLastCodon = "";
		let secondResultLastCodon = "";
		let thirdResultLastCodon = "";
		let firstResultSpan = "";
		let secondResultSpan = "";
		let thirdResultSpan = "";


		if (that.props.state.input != null) {

			DnaIsMatrixCheckbox.checked = that.props.state.matrix;
			let selected = that.props.state.initialSequence;
			if (selected == "DNA") {
				spinner.value = ID_DNA;
				firstResultHead.textContent = "mRNA";
				secondResultHead.textContent = "tRNA";
			} else if (selected === "mRNA") {
				spinner.value = ID_mRNA;
				firstResultHead.textContent = "DNA";
				secondResultHead.textContent = "tRNA";
			} else if (selected === "tRNA") {
				firstResultHead.textContent = "DNA";
				secondResultHead.textContent = "mRNA";
				spinner.value = ID_tRNA;
			} 
			
			console.log(selected);
			console.log(spinner.value);
			// spinner.value = 2;

			that.props.state.input.match(/.{1,3}/g).forEach((e, i) => {
				executeSolving(e);
				sequenceContainer.innerHTML += `<span class="result_piece colored_span colored_${color_index}">${e}</span>`;
				if (color_index < 3) {
					color_index++;
				} else {
					color_index = 0;
				}
			});
		}

		function updateState() {
			that.props.updateState(spinner.options[spinner.selectedIndex].textContent, 
				sequenceContainer.textContent, 
				firstResultField.textContent, 
				secondResultField.textContent, 
				thirdResultField.textContent, 
				DnaIsMatrixCheckbox.checked
			);
		}

		function handleAminoAcid(lastMRNA) {
		  let aminoAcid = "";

		  if ((URACIL + URACIL + URACIL) === (lastMRNA) || (URACIL + URACIL + CYTOSINE) === (lastMRNA)) {
		      aminoAcid = phenylalanine_short;
		  } else if ((URACIL + URACIL + ADENINE) === (lastMRNA) || (URACIL + URACIL + GUANINE) === (lastMRNA) || (CYTOSINE + URACIL + URACIL) === (lastMRNA) || (CYTOSINE + URACIL + CYTOSINE) === (lastMRNA) || (CYTOSINE + URACIL + ADENINE) === (lastMRNA) || (CYTOSINE + URACIL + GUANINE) === (lastMRNA)) {
		      aminoAcid = leucine_short;
		  } else if ((URACIL + CYTOSINE + URACIL) === (lastMRNA) || (URACIL + CYTOSINE + CYTOSINE) === (lastMRNA) || (URACIL + CYTOSINE + ADENINE) === (lastMRNA) || (URACIL + CYTOSINE + GUANINE) === (lastMRNA) || (ADENINE + GUANINE + URACIL) === (lastMRNA) || (ADENINE + GUANINE + CYTOSINE) === (lastMRNA)) {
		      aminoAcid = serine_short;
		  } else if ((URACIL + ADENINE + URACIL) === (lastMRNA) || (URACIL + ADENINE + CYTOSINE) === (lastMRNA)) {
		      aminoAcid = tyrosine_short;
		  } else if ((URACIL + GUANINE + URACIL) === (lastMRNA) || (URACIL + GUANINE + CYTOSINE) === (lastMRNA)) {
		      aminoAcid = cysteine_short;
		  } else if ((URACIL + GUANINE + GUANINE) === (lastMRNA)) {
		      aminoAcid = tryptophan_short;
		  } else if ((CYTOSINE + CYTOSINE + URACIL) === (lastMRNA) || (CYTOSINE + CYTOSINE + CYTOSINE) === (lastMRNA) || (CYTOSINE + CYTOSINE + ADENINE) === (lastMRNA) || (CYTOSINE + CYTOSINE + GUANINE) === (lastMRNA)) {
		      aminoAcid = proline_short;
		  } else if ((CYTOSINE + ADENINE + URACIL) === (lastMRNA) || (CYTOSINE + ADENINE + CYTOSINE) === (lastMRNA)) {
		      aminoAcid = histidine_short;
		  } else if ((CYTOSINE + GUANINE + URACIL) === (lastMRNA) || (CYTOSINE + GUANINE + CYTOSINE) === (lastMRNA) || (CYTOSINE + GUANINE + ADENINE) === (lastMRNA) || (CYTOSINE + GUANINE + GUANINE) === (lastMRNA) || (ADENINE + GUANINE + ADENINE) === (lastMRNA) || (ADENINE + GUANINE + GUANINE) === (lastMRNA)) {
		      aminoAcid = arginine_short;
		  } else if ((ADENINE + URACIL + URACIL) === (lastMRNA) || (ADENINE + URACIL + CYTOSINE) === (lastMRNA) || (ADENINE + URACIL + ADENINE) === (lastMRNA)) {
		      aminoAcid = isoleucine_short;
		  } else if ((ADENINE + CYTOSINE + URACIL) === (lastMRNA) || (ADENINE + CYTOSINE + CYTOSINE) === (lastMRNA) || (ADENINE + CYTOSINE + ADENINE) === (lastMRNA) || (ADENINE + CYTOSINE + GUANINE) === (lastMRNA)) {
		      aminoAcid = threonine_short;
		  } else if ((ADENINE + ADENINE + URACIL) === (lastMRNA) || (ADENINE + ADENINE + CYTOSINE) === (lastMRNA)) {
		      aminoAcid = asparagine_short;
		  } else if ((ADENINE + URACIL + GUANINE) === (lastMRNA)) {
		      aminoAcid = methionine_short;
		  } else if ((ADENINE + ADENINE + ADENINE) === (lastMRNA) || (ADENINE + ADENINE + GUANINE) === (lastMRNA)) {
		      aminoAcid = lysine_short;
		  } else if ((GUANINE + URACIL + URACIL) === (lastMRNA) || (GUANINE + URACIL + CYTOSINE) === (lastMRNA) || (GUANINE + URACIL + ADENINE) === (lastMRNA) || (GUANINE + URACIL + GUANINE) === (lastMRNA)) {
		      aminoAcid = valine_short;
		  } else if ((GUANINE + CYTOSINE + URACIL) === (lastMRNA) || (GUANINE + CYTOSINE + CYTOSINE) === (lastMRNA) || (GUANINE + CYTOSINE + ADENINE) === (lastMRNA) || (GUANINE + CYTOSINE + GUANINE) === (lastMRNA)) {
		      aminoAcid = alanine_short;
		  } else if ((GUANINE + ADENINE + URACIL) === (lastMRNA) || (GUANINE + ADENINE + CYTOSINE) === (lastMRNA)) {
		      aminoAcid = aspartic_acid_short;
		  } else if ((GUANINE + ADENINE + ADENINE) === (lastMRNA) || (GUANINE + ADENINE + GUANINE) === (lastMRNA)) {
		      aminoAcid = glutamine_acid_short;
		  } else if ((GUANINE + GUANINE + URACIL) === (lastMRNA) || (GUANINE + GUANINE + CYTOSINE) === (lastMRNA) || (GUANINE + GUANINE + ADENINE) === (lastMRNA) || (GUANINE + GUANINE + GUANINE) === (lastMRNA)) {
		      aminoAcid = glycine_short;
		  } else if ((URACIL + ADENINE + ADENINE) === (lastMRNA) || (URACIL + ADENINE + GUANINE) === (lastMRNA) || (URACIL + GUANINE + ADENINE) === (lastMRNA)) {
		      aminoAcid = stop_short;
		  } else if ((CYTOSINE + ADENINE + ADENINE) === (lastMRNA) || (CYTOSINE + ADENINE + GUANINE) === (lastMRNA)) {
		      aminoAcid = glutamine_short;
		  }

		  return aminoAcid + "-";
		}

		function solveForDNA(lastCodon) {
		  let lastCodonSplitted = lastCodon.split("");
		  lastCodonSplitted.forEach( (element) => {
		    if (element === "A") {
		      firstResultLastCodon += "U";
		      secondResultLastCodon += "A";
		    } else if (element === "T") {
		      firstResultLastCodon += "A";
		      secondResultLastCodon += "U";
		    } else if (element === "G") {
		      firstResultLastCodon += "C";
		      secondResultLastCodon += "G";
		    } else if (element === "C") {
		      firstResultLastCodon += "G";
		      secondResultLastCodon += "C";
		    } 
		  });
		  firstResultField.innerHTML += `<span class="result_piece colored_span colored_${color_index}">${firstResultLastCodon}</span>`;
		  secondResultField.innerHTML += `<span class="result_piece">${secondResultLastCodon}; </span>`;
		  thirdResultField.innerHTML += `<span class="result_piece">${handleAminoAcid(firstResultLastCodon)}</span>`
		};

		function solveForMatrixDNA(lastCodon) {
		  let lastCodonSplitted = lastCodon.split("");
		  lastCodonSplitted.forEach( (element) => {
		    if (element === "A") {
		      firstResultLastCodon += "A";
		      secondResultLastCodon += "U";
		    } else if (element === "T") {
		      firstResultLastCodon += "U";
		      secondResultLastCodon += "A";
		    } else if (element === "G") {
		      firstResultLastCodon += "G";
		      secondResultLastCodon += "C";
		    } else if (element === "C") {
		      firstResultLastCodon += "C";
		      secondResultLastCodon += "G";
		    } 
		  });
		  firstResultField.innerHTML += `<span class="result_piece colored_span colored_${color_index}">${firstResultLastCodon}</span>`;
		  secondResultField.innerHTML += `<span class="result_piece">${secondResultLastCodon}; </span>`;
		  thirdResultField.innerHTML += `<span class="result_piece">${handleAminoAcid(firstResultLastCodon)}</span>`
		};

		function solveForMRNA(lastCodon) {
		  let lastCodonSplitted = lastCodon.split("");
		  
		  lastCodonSplitted.forEach( (element) => {
		    if (element === "A") {
		      firstResultLastCodon += "T";
		      secondResultLastCodon += "U";
		    } else if (element === "U") {
		      firstResultLastCodon += "A";
		      secondResultLastCodon += "A";
		    } else if (element === "G") {
		      firstResultLastCodon += "G";
		      secondResultLastCodon += "C";
		    } else if (element === "C") {
		      firstResultLastCodon += "G";
		      secondResultLastCodon += "G";
		    } 
		  });

		  firstResultField.innerHTML += `<span class="result_piece colored_span colored_${color_index}">${firstResultLastCodon}</span>`;
		  secondResultField.innerHTML += `<span class="result_piece">${secondResultLastCodon}; </span>`;
		  thirdResultField.innerHTML += `<span class="result_piece">${handleAminoAcid(lastCodon)}</span>`
		}

		function solveForTRNA(lastCodon) {
		  let lastCodonSplitted = lastCodon.split("");
		  
		  lastCodonSplitted.forEach( (element) => {
		    if (element === "A") {
		      firstResultLastCodon += "A";
		      secondResultLastCodon += "U";
		    } else if (element === "U") {
		      firstResultLastCodon += "T";
		      secondResultLastCodon += "A";
		    } else if (element === "G") {
		      firstResultLastCodon += "G";
		      secondResultLastCodon += "C";
		    } else if (element === "C") {
		      firstResultLastCodon += "C";
		      secondResultLastCodon += "G";
		    } 
		  });

		  firstResultField.innerHTML += `<span class="result_piece colored_span colored_${color_index}">${firstResultLastCodon}</span>`;
		  secondResultField.innerHTML += `<span class="result_piece colored_span colored_${color_index}">${secondResultLastCodon}</span>`;
		  thirdResultField.innerHTML += `<span class="result_piece">${handleAminoAcid(secondResultLastCodon)}</span>`
		}

		function executeSolving(lastCodon) {

		  explanationBtn.disabled = false;

		  let spinnerSelected = parseInt(spinner.options[spinner.selectedIndex].value);
		  firstResultLastCodon = "";
		  secondResultLastCodon = "";
		  thirdResultLastCodon = "";
		  switch(spinnerSelected) {
		    case 0:
		      if (DnaIsMatrixCheckbox.checked) {
		        solveForMatrixDNA(lastCodon);
		      } else {
		        solveForDNA(lastCodon);
		      }
		      break;

		    case 1: 
		      solveForMRNA(lastCodon);
		      break;

		    case 2: 
		      solveForTRNA(lastCodon);
		      break;
		  }

		  updateState();
		};

		function removeFade() {
		  allCodonTextFields.forEach( (element) => {
		    element.classList.remove("text__faded");
		  });
		};

		function collapseAccordion(accordion) {
		  let panel = Array.from(accordion.children)[1]
		  let button = Array.from(accordion.children)[0];
		  panel.style.maxHeight = null;
		  button.classList.remove("accordion-btn_active");
		}

		function handleInputsOnClick(button) { // Adds inputs to container and colors codons by btn pressed
		  return function() {

		    removeFade();

		    if (count === 0) {
		      sequenceContainer.innerHTML += button.textContent;
		      lastCodon = button.textContent;
		      initialSequenseSpan = button.textContent;
		      beforeEnteringText.textContent = INCOMPLETE_SEQUENCE;
		      explanationBtn.disabled = true;
		      beforeEnteringText.classList.remove("before_entering_text__faded");
		      count++;
		    } else if (count === 1) {
		      sequenceContainer.innerHTML += button.textContent;
		      lastCodon += button.textContent;
		      initialSequenseSpan += button.textContent;
		      count++;
		    } else if (count === 2) {
		      sequenceContainer.innerHTML = sequenceContainer.innerHTML.substring(0, sequenceContainer.innerHTML.length - 2);
		      initialSequenseSpan += button.textContent;
		      sequenceContainer.innerHTML += `<span class="result_piece colored_span">${initialSequenseSpan}</span>`;
		      sequenceContainer.lastChild.classList.add(`colored_${color_index}`);
		      beforeEnteringText.classList.add("before_entering_text__faded")

		      lastCodon += button.textContent;
		      executeSolving(lastCodon);
		      if (color_index < 3) {
		        color_index++;
		      } else {
		        color_index = 0;
		      }
		      count = 0;
		    }
		  };
		};

		function handleInputsOnKeyPress(key) { // Adds inputs to container and colors codons by key pressed
		  removeFade();
		  if (count === 0) {
		    sequenceContainer.innerHTML += key;
		    lastCodon = key;
		    initialSequenseSpan = key;
		    beforeEnteringText.textContent = INCOMPLETE_SEQUENCE;
		    explanationBtn.disabled = true;
		    beforeEnteringText.classList.remove("before_entering_text__faded");
		    count++;
		   
		  } else if (count === 1) {
		    sequenceContainer.innerHTML += key;
		    lastCodon += key;
		    initialSequenseSpan += key;
		    count++;
		  } else if (count === 2) {
		    sequenceContainer.innerHTML = sequenceContainer.innerHTML.substring(0, sequenceContainer.innerHTML.length - 2);
		    initialSequenseSpan += key;
		    sequenceContainer.innerHTML += `<span class="result_piece colored_span">${initialSequenseSpan}</span>`;
		    sequenceContainer.lastChild.classList.add(`colored_${color_index}`);
		    beforeEnteringText.classList.add("before_entering_text__faded")

		    lastCodon += key;
		    executeSolving(lastCodon);
		    if (color_index < 3) {
		      color_index++;
		    } else {
		      color_index = 0;
		    }
		    count = 0;
		  }
		};

		function buildResultsByNucleotides(nucleotide) {
		  removeFade();

		  if (count === 0) {
		    lastCodon = nucleotide;
		    initialSequenseSpan = nucleotide;
		    beforeEnteringText.textContent = INCOMPLETE_SEQUENCE;
		    beforeEnteringText.classList.remove("before_entering_text__faded");
		    explanationBtn.disabled = true;
		    count++;
		    
		  } else if (count === 1) {
		    lastCodon += nucleotide;
		    initialSequenseSpan += nucleotide;
		    count++;
		  } else if (count === 2) {
		    initialSequenseSpan += nucleotide;
		    beforeEnteringText.classList.add("before_entering_text__faded");

		    lastCodon += nucleotide;
		    executeSolving(lastCodon);
		    if (color_index < 3) {
		      color_index++;
		    } else {
		      color_index = 0;
		    }
		    count = 0;
		  }
		};

		let flag_transitionCleared;

		function clearResultFields() {
		  allResultTextFields.forEach( (element) => {
		    element.innerHTML = "";
		  }); 
		};

		function clearAllFields() {
		  if (sequenceContainer.textContent.length !== 0) {
		    allCodonTextFields.forEach( (element) => {
		      flag_transitionCleared = true;
		      element.classList.add("text__faded");
		    });
		  }

		  beforeEnteringText.innerHTML = "Start typing sequence";
		  beforeEnteringText.classList.remove("before_entering_text__faded");
		  initialSequenseSpan = "";
		  lastCodon = "";
		  explanationBtn.disabled = true;
		 
		};

		allCodonTextFields.forEach( (element) => {
		  element.addEventListener("animationend", function() {
		    if (element === sequenceContainer) {
		      if (flag_transitionCleared) {
		        element.innerHTML = "";
		        flag_transitionCleared = false;
		      }
		    } else {
		        element.innerHTML = "";
		    }
		    count = 0;
		    color_index = 0;
		  });
		});

		inputButtons.forEach( (element) => {
		  element.addEventListener('click', handleInputsOnClick(element));
		});

		clearBtn.addEventListener('click', clearAllFields);

		let eraseLastCodon = "";

		function eraseLast() { // Erases last digit in input field and handles result fields afterwards
		  if (sequenceContainer.innerHTML.length > 0) {
		    beforeEnteringText.classList.remove("before_entering_text__faded");
		    explanationBtn.disabled = true;
		    eraseLastCodon = sequenceContainer.lastChild.textContent;
		    if ( sequenceContainer.lastChild.tagName === "SPAN") {
		      count = 2;
		      let spanContent = sequenceContainer.lastChild.textContent;
		      sequenceContainer.removeChild(sequenceContainer.lastChild);
		      sequenceContainer.innerHTML += spanContent.substring(0, 2);
		      lastCodon = spanContent.substring(0, 2);
		      firstResultField.removeChild(firstResultField.lastChild);
		      secondResultField.removeChild(secondResultField.lastChild);
		      thirdResultField.removeChild(thirdResultField.lastChild);
		      initialSequenseSpan = spanContent.substring(0, 2);
		      if (color_index > 0) {
		        color_index--;
		      }


		    } else {
		      sequenceContainer.innerHTML = sequenceContainer.innerHTML.substring(0, sequenceContainer.innerHTML.length - 1);
		      initialSequenseSpan = initialSequenseSpan.substring(0, initialSequenseSpan.length - 1);
		      lastCodon = lastCodon.substring(0, lastCodon.length - 1);
		      count--;

		      if (sequenceContainer.lastChild !== null && sequenceContainer.lastChild.tagName === "SPAN") {

		        if (sequenceContainer.lastChild.classList[1].split("_").pop() === 3) {
		          color_index = 3;
		        }
		        color_index = parseInt(sequenceContainer.lastChild.classList[2].split("_").pop()) + 1;
		        beforeEnteringText.classList.add("before_entering_text__faded");
		        explanationBtn.disabled = false;

		      }
		      
		    }
		  } 
		  if (sequenceContainer.innerHTML.length === 0) {
		    beforeEnteringText.classList.remove("before_entering_text__faded");
		    beforeEnteringText.textContent = "Start typing sequence";
		  }
		}

		eraseBtn.addEventListener('click', eraseLast)

		customCheckboxContainer.addEventListener('mousedown', function() {
		  Waves.ripple(document.querySelector('.ripple'), {
		    wait: 100000, //ms
		    position: { // This position relative to HTML element.
		        x: 20, //px
		        y: 20  //px
		    }
		  });
		});

		customCheckboxContainer.addEventListener('mouseup', () => {
		  Waves.calm(document.querySelector('.ripple'));
		});

		customCheckboxContainer.addEventListener('mouseout', () => {
		  Waves.calm(document.querySelector('.ripple'));
		});

		spinner.addEventListener('click', function(el){ // Colors spinner items
		  let options = spinner.children;
		  for (let i = 0; i < spinner.childElementCount; i++) {
		    options[i].style.backgroundColor = "#FAE0E0";
		    options[i].style.color = "#000";
		  }
		  let selected = document.querySelector(`#spinner_item_${spinner.options[spinner.selectedIndex].value}`);
		  selected.style.backgroundColor = "#E04F60";
		  selected.style.color = "white";
		});

		spinner.addEventListener("change", function() {
		  if (sequenceContainer.textContent.length !== 0) {
		    clearAllFields();
		  }
		  switch (parseInt(spinner.options[spinner.selectedIndex].value)) {
		    case ID_DNA:
		      firstResultHead.textContent = "mRNA";
		      secondResultHead.textContent = "tRNA";
		      thymineBtn.textContent = "T";
		      DnaIsMatrixCheckbox.disabled = false;
		      customCheckboxContainer.style.opacity = "1";
		      initialSequence = "DNA";
		      break;

		    case ID_mRNA: 
		      firstResultHead.textContent = "DNA";
		      secondResultHead.textContent = "tRNA";
		      thymineBtn.textContent = "U";
		      DnaIsMatrixCheckbox.disabled = true;
		      DnaIsMatrixCheckbox.checked = false;
		      customCheckboxContainer.style.opacity = ".5";
		      initialSequence = "mRNA";
		      break;

		    case ID_tRNA: 
		      firstResultHead.textContent = "DNA";
		      secondResultHead.textContent = "mRNA";
		      thymineBtn.textContent = "U";
		      DnaIsMatrixCheckbox.disabled = true;
		      DnaIsMatrixCheckbox.checked = false;
		      customCheckboxContainer.style.opacity = ".5";
		      initialSequence = "tRNA";
		      break;
		  }
			updateState();
		});


		document.addEventListener('keydown', (event) => {
		  switch(event.key) {
		    case "Backspace":
		      eraseLast();
		      performClick(eraseBtn);
		      
		      break;

		    case "a":
		      handleInputsOnKeyPress("A");
		      performClick(adenineBtn);
		      break;

		    case "t":
		      handleInputsOnKeyPress(thymineBtn.textContent);
		      performClick(thymineBtn);
		      break;

		    case "u":
		      handleInputsOnKeyPress(thymineBtn.textContent);
		      performClick(thymineBtn);
		      break;

		    case "g":
		      handleInputsOnKeyPress("G");
		      performClick(guanineBtn);
		      break;

		    case "c":
		      handleInputsOnKeyPress("C");
		      performClick(cytosineBtn);
		      break;
		  }


			
		});

		function recalculate() {
		  clearResultFields();
		  let codonSpans = Array.from(sequenceContainer.children);
		  color_index = 0;

		  codonSpans.forEach( (element) => {
		    element.textContent.split("").forEach( (nucleotide) => {
		      buildResultsByNucleotides(nucleotide);
		    });
		  });
		}

		DnaIsMatrixCheckbox.addEventListener("click", recalculate);

		window.addEventListener("scroll", () => {
		  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
		    navbar.classList.add("navbar-collapsed");
		  } else {
		    navbar.classList.remove("navbar-collapsed");
		  }
		});

		document.querySelectorAll(".accordion-btn").forEach( (element) => {
		  element.addEventListener("click", () => {
		  element.classList.toggle("accordion-btn_active");

		  let panel = element.nextElementSibling;
		    if (panel.style.maxHeight){
		      panel.style.maxHeight = null;
		    } else {
		      panel.style.maxHeight = panel.scrollHeight + "px";
		    } 
		  });
		});
	}

	render() {


		return(

			<React.Fragment>
			  <div className="row row-content align-items-center justify-content-start">
			    <div className="col-auto"><h2>Initial data:</h2></div>
			    <div className="col mt-sm-0 mt-2">
			      <label className="custom-checkbox-container">
			        <input type="checkbox" name="DNA-is-matrix" id="DNA-is-matrix"/>
			        All types of RNA are synthesized on a DNA matrix
			        <span className="checkmark"></span>
			        <span className="ripple waves-classic"></span>
			      </label>
			
			    </div>
			    <div className="spinner col-auto mt-md-0 mt-2">
			        <div className="">
			          Sequence
			        </div>
			        <div className="">
			          <form>
			            <select id="sequence-type" name="sequence-type" defaultValue="0">
			              <option id="spinner_item_0" value="0">DNA</option>
			              <option id="spinner_item_1" value="1">mRNA</option>
			              <option id="spinner_item_2" value="2">tRNA</option>
			            </select>
			          </form>
			        </div>
			    </div>
			  </div>
			
			
			  <div className="row row-content">
			    <div className="col-12 input-sequence-wrap">
			      <span className="input-sequence"></span>
			    </div>
			  </div>
			
			  <div className="row row-content input-buttons justify-content-center">
			    <button className="col-auto input-btn btn-adenine m-1">A</button>
			    <button className="col-auto input-btn btn-thymine m-1">T</button>
			    <button className="col-auto input-btn btn-guanine m-1">G</button>
			    <button className="col-auto input-btn btn-cytosine m-1">C</button>
			  </div>
			  <div className="row row-content input-buttons justify-content-lg-end justify-content-center">
			    <span className="grey-text keys-notif d-none d-lg-block align-self-center m-auto">You can also type with corresponding keyboard kyes!</span>
			    <button className="col-auto input-btn btn-clear m-1">Clear All</button>
			    <button className="col-auto input-btn btn-erase m-1">Erase</button>
			  </div>
			
			  <div className="row row-content align-items-center">
			    <h2 className="col-auto">Result:</h2>
			    <span className="col grey-text before_entering_text">Start typing sequence</span>
			  </div>
			
			  <div className="row row-content">
			    <div className="result-container col-12 col-lg-4">
			      <div className="row result_container">
			        <span className="grey-text col-12" id="result-head_1">mRNA</span>
			        <span className="result col-12" id="result_1"></span>
			      </div>
			    </div>
			
			    <div className="result-container col-12 col-lg-4">
			      <div className="row result_container">
			        <span className="grey-text col-12" id="result-head_2">tRNA</span>
			        <span className="result col-12" id="result_2"></span>
			      </div>
			    </div>
			
			    <div className="result-container col-12 col-lg-4">
			      <div className="row result_container">
			        <span className="grey-text col-12" id="result-head_3">Amino acid chain</span>
			        <span className="result col-12" id="result_3"></span>
			      </div>
			    </div>
			  </div>

			  <div className="row row-content justify-content-center">
			  	<div className="col-auto">
			  		<Link to={{
			  			pathname: "/Explanation",
			  			state: {
							initialSequence: initialSequence,
							input: input
			  			}
			  		}}>
			  			<button className="input-btn expl-btn" disabled={true}>Explanation</button>
			  		</Link>
			  	</div>
			  </div>
			
			  <div className="row row-content justify-content-center">
			    <div className="accordion col-lg-8 mb-3 mx-3">
			      <button className="accordion-btn waves-light">Genome table</button>
			      <div className="accordion-content">
			        <div className="row justify-content-center">
			        	<img src={process.env.PUBLIC_URL + './assets/images/genome_table_eng.jpg'} alt="Genome table"/>
			        </div>
			      </div>
			    </div>
		
			  </div>

			  

			  
			
			</React.Fragment>

		);

	}
}

export default withRouter(Input);