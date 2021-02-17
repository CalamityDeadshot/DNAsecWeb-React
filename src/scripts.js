
// TODO: добавить выделение кодона и соотв. ему результатов при фокусе
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

const firstResultHead = document.querySelector('#result-head_1');
const firstResultField = document.querySelector('#result_1');

const secondResultHead = document.querySelector('#result-head_2');
const secondResultField = document.querySelector('#result_2');

const thirdResultHead = document.querySelector('#result-head_3');
const thirdResultField = document.querySelector('#result_3');

const explanationAccordion = document.querySelector(".explanation-accordion");
const explanationAccordionBtn = document.querySelector(".explanation-accordion-btn");


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

const explanationForDNA = [
  'By the <a class="link_regular" href="https://en.wikipedia.org/wiki/Complementarity_(molecular_biology)">principle of complementarity</a>, mRNA is synthesized on the template DNA (transcription process).',
  'The translation process occurs in the ribosome. <br>Transport RNA (tRNA) molecules, the anticodons of which are complementary to the mRNA codons in the ribosome, recognize the mRNA sequence',
  'After the tRNA molecules recognize the mRNA codons, the amino acids (AA) of the corresponding tRNA are attached to each other (with the formation of a peptide bond), forming a protein chain.'
];

const explanationForMatrixDNA = [
  'All types of RNA are synthesized on a DNA matrix. <br>Then, by the <a class="link_regular" href="https://en.wikipedia.org/wiki/Complementarity_(molecular_biology)">principle of complementarity</a>, tRNA is synthesized on the template DNA.',
  'According to the principle of complementarity, based on tRNA anticodons, we find the nucleotide sequence of mRNA codons.',
  'Based on the mRNA codons, the amino acid sequence is synthesized.'
];

const explanationForMRNA = [
  'Using the <a class="link_regular" href="https://en.wikipedia.org/wiki/Complementarity_(molecular_biology)">principle of complementarity</a>, it is possible to reconstruct the DNA fragment, which was a basis for mRNA synthesis.',
  explanationForDNA[1],
  explanationForDNA[2]
];

const explanationForTRNA = [
  'Using the <a class="link_regular" href="https://en.wikipedia.org/wiki/Complementarity_(molecular_biology)">principle of complementarity</a>, it is possible to reconstruct the mRNA fragment recognized by the tRNA anticodons',
  'Using the principle of complementarity, it is possible to reconstruct the DNA fragment, which was a basis for mRNA synthesis.',
  explanationForDNA[2]
];

Waves.attach('.input-btn', ['waves-float']);
Waves.attach('.ripple');
Waves.attach('.accordion-btn');
Waves.init();

function performClick(element) {
  Waves.ripple(element);
}

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

function handleAminoAcid(lastMRNA) {
  let aminoAcid = "";

  if ((URACIL + URACIL + URACIL) == (lastMRNA) || (URACIL + URACIL + CYTOSINE) == (lastMRNA)) {
      aminoAcid = phenylalanine_short;
  } else if ((URACIL + URACIL + ADENINE) == (lastMRNA) || (URACIL + URACIL + GUANINE) == (lastMRNA) || (CYTOSINE + URACIL + URACIL) == (lastMRNA) || (CYTOSINE + URACIL + CYTOSINE) == (lastMRNA) || (CYTOSINE + URACIL + ADENINE) == (lastMRNA) || (CYTOSINE + URACIL + GUANINE) == (lastMRNA)) {
      aminoAcid = leucine_short;
  } else if ((URACIL + CYTOSINE + URACIL) == (lastMRNA) || (URACIL + CYTOSINE + CYTOSINE) == (lastMRNA) || (URACIL + CYTOSINE + ADENINE) == (lastMRNA) || (URACIL + CYTOSINE + GUANINE) == (lastMRNA) || (ADENINE + GUANINE + URACIL) == (lastMRNA) || (ADENINE + GUANINE + CYTOSINE) == (lastMRNA)) {
      aminoAcid = serine_short;
  } else if ((URACIL + ADENINE + URACIL) == (lastMRNA) || (URACIL + ADENINE + CYTOSINE) == (lastMRNA)) {
      aminoAcid = tyrosine_short;
  } else if ((URACIL + GUANINE + URACIL) == (lastMRNA) || (URACIL + GUANINE + CYTOSINE) == (lastMRNA)) {
      aminoAcid = cysteine_short;
  } else if ((URACIL + GUANINE + GUANINE) == (lastMRNA)) {
      aminoAcid = tryptophan_short;
  } else if ((CYTOSINE + CYTOSINE + URACIL) == (lastMRNA) || (CYTOSINE + CYTOSINE + CYTOSINE) == (lastMRNA) || (CYTOSINE + CYTOSINE + ADENINE) == (lastMRNA) || (CYTOSINE + CYTOSINE + GUANINE) == (lastMRNA)) {
      aminoAcid = proline_short;
  } else if ((CYTOSINE + ADENINE + URACIL) == (lastMRNA) || (CYTOSINE + ADENINE + CYTOSINE) == (lastMRNA)) {
      aminoAcid = histidine_short;
  } else if ((CYTOSINE + GUANINE + URACIL) == (lastMRNA) || (CYTOSINE + GUANINE + CYTOSINE) == (lastMRNA) || (CYTOSINE + GUANINE + ADENINE) == (lastMRNA) || (CYTOSINE + GUANINE + GUANINE) == (lastMRNA) || (ADENINE + GUANINE + ADENINE) == (lastMRNA) || (ADENINE + GUANINE + GUANINE) == (lastMRNA)) {
      aminoAcid = arginine_short;
  } else if ((ADENINE + URACIL + URACIL) == (lastMRNA) || (ADENINE + URACIL + CYTOSINE) == (lastMRNA) || (ADENINE + URACIL + ADENINE) == (lastMRNA)) {
      aminoAcid = isoleucine_short;
  } else if ((ADENINE + CYTOSINE + URACIL) == (lastMRNA) || (ADENINE + CYTOSINE + CYTOSINE) == (lastMRNA) || (ADENINE + CYTOSINE + ADENINE) == (lastMRNA) || (ADENINE + CYTOSINE + GUANINE) == (lastMRNA)) {
      aminoAcid = threonine_short;
  } else if ((ADENINE + ADENINE + URACIL) == (lastMRNA) || (ADENINE + ADENINE + CYTOSINE) == (lastMRNA)) {
      aminoAcid = asparagine_short;
  } else if ((ADENINE + URACIL + GUANINE) == (lastMRNA)) {
      aminoAcid = methionine_short;
  } else if ((ADENINE + ADENINE + ADENINE) == (lastMRNA) || (ADENINE + ADENINE + GUANINE) == (lastMRNA)) {
      aminoAcid = lysine_short;
  } else if ((GUANINE + URACIL + URACIL) == (lastMRNA) || (GUANINE + URACIL + CYTOSINE) == (lastMRNA) || (GUANINE + URACIL + ADENINE) == (lastMRNA) || (GUANINE + URACIL + GUANINE) == (lastMRNA)) {
      aminoAcid = valine_short;
  } else if ((GUANINE + CYTOSINE + URACIL) == (lastMRNA) || (GUANINE + CYTOSINE + CYTOSINE) == (lastMRNA) || (GUANINE + CYTOSINE + ADENINE) == (lastMRNA) || (GUANINE + CYTOSINE + GUANINE) == (lastMRNA)) {
      aminoAcid = alanine_short;
  } else if ((GUANINE + ADENINE + URACIL) == (lastMRNA) || (GUANINE + ADENINE + CYTOSINE) == (lastMRNA)) {
      aminoAcid = aspartic_acid_short;
  } else if ((GUANINE + ADENINE + ADENINE) == (lastMRNA) || (GUANINE + ADENINE + GUANINE) == (lastMRNA)) {
      aminoAcid = glutamine_acid_short;
  } else if ((GUANINE + GUANINE + URACIL) == (lastMRNA) || (GUANINE + GUANINE + CYTOSINE) == (lastMRNA) || (GUANINE + GUANINE + ADENINE) == (lastMRNA) || (GUANINE + GUANINE + GUANINE) == (lastMRNA)) {
      aminoAcid = glycine_short;
  } else if ((URACIL + ADENINE + ADENINE) == (lastMRNA) || (URACIL + ADENINE + GUANINE) == (lastMRNA) || (URACIL + GUANINE + ADENINE) == (lastMRNA)) {
      aminoAcid = stop_short;
  } else if ((CYTOSINE + ADENINE + ADENINE) == (lastMRNA) || (CYTOSINE + ADENINE + GUANINE) == (lastMRNA)) {
      aminoAcid = glutamine_short;
  }

  return aminoAcid + "-";
}

function solveForDNA(lastCodon) {
  let lastCodonSplitted = lastCodon.split("");
  lastCodonSplitted.forEach( (element) => {
    if (element == "A") {
      firstResultLastCodon += "U";
      secondResultLastCodon += "A";
    } else if (element == "T") {
      firstResultLastCodon += "A";
      secondResultLastCodon += "U";
    } else if (element == "G") {
      firstResultLastCodon += "C";
      secondResultLastCodon += "G";
    } else if (element == "C") {
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
    if (element == "A") {
      firstResultLastCodon += "A";
      secondResultLastCodon += "U";
    } else if (element == "T") {
      firstResultLastCodon += "U";
      secondResultLastCodon += "A";
    } else if (element == "G") {
      firstResultLastCodon += "G";
      secondResultLastCodon += "C";
    } else if (element == "C") {
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
    if (element == "A") {
      firstResultLastCodon += "T";
      secondResultLastCodon += "U";
    } else if (element == "U") {
      firstResultLastCodon += "A";
      secondResultLastCodon += "A";
    } else if (element == "G") {
      firstResultLastCodon += "G";
      secondResultLastCodon += "C";
    } else if (element == "C") {
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
    if (element == "A") {
      firstResultLastCodon += "A";
      secondResultLastCodon += "U";
    } else if (element == "U") {
      firstResultLastCodon += "T";
      secondResultLastCodon += "A";
    } else if (element == "G") {
      firstResultLastCodon += "G";
      secondResultLastCodon += "C";
    } else if (element == "C") {
      firstResultLastCodon += "C";
      secondResultLastCodon += "G";
    } 
  });

  firstResultField.innerHTML += `<span class="result_piece colored_span colored_${color_index}">${firstResultLastCodon}</span>`;
  secondResultField.innerHTML += `<span class="result_piece">${secondResultLastCodon}; </span>`;
  thirdResultField.innerHTML += `<span class="result_piece">${handleAminoAcid(secondResultLastCodon)}</span>`
}

function executeSolving(lastCodon) {

  explanationAccordionBtn.disabled = false;
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

    if (count == 0) {
      sequenceContainer.innerHTML += button.textContent;
      lastCodon = button.textContent;
      initialSequenseSpan = button.textContent;
      beforeEnteringText.textContent = INCOMPLETE_SEQUENCE;
      beforeEnteringText.classList.remove("before_entering_text__faded");
      explanationAccordionBtn.disabled = true;
      collapseAccordion(explanationAccordion);
      count++;
    } else if (count == 1) {
      sequenceContainer.innerHTML += button.textContent;
      lastCodon += button.textContent;
      initialSequenseSpan += button.textContent;
      count++;
      explanationAccordionBtn.disabled = true
    } else if (count == 2) {
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

  if (count == 0) {
    sequenceContainer.innerHTML += key;
    lastCodon = key;
    initialSequenseSpan = key;
    beforeEnteringText.textContent = INCOMPLETE_SEQUENCE;
    beforeEnteringText.classList.remove("before_entering_text__faded");
    count++;
    explanationAccordionBtn.disabled = true;
    collapseAccordion(explanationAccordion);
  } else if (count == 1) {
    sequenceContainer.innerHTML += key;
    lastCodon += key;
    initialSequenseSpan += key;
    count++;
  } else if (count == 2) {
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

  if (count == 0) {
    lastCodon = nucleotide;
    initialSequenseSpan = nucleotide;
    beforeEnteringText.textContent = INCOMPLETE_SEQUENCE;
    beforeEnteringText.classList.remove("before_entering_text__faded");
    count++;
    explanationAccordionBtn.disabled = true;
    collapseAccordion(explanationAccordion);
  } else if (count == 1) {
    lastCodon += nucleotide;
    initialSequenseSpan += nucleotide;
    count++;
  } else if (count == 2) {
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
  if (sequenceContainer.textContent.length != 0) {
    allCodonTextFields.forEach( (element) => {
      flag_transitionCleared = true;
      element.classList.add("text__faded");
    });
  }

  beforeEnteringText.innerHTML = "Start typing sequence";
  beforeEnteringText.classList.remove("before_entering_text__faded");
  initialSequenseSpan = "";
  lastCodon = "";
  explanationAccordionBtn.disabled = true;
  collapseAccordion(explanationAccordion);
};

allCodonTextFields.forEach( (element) => {
  element.addEventListener("animationend", function() {
    if (element == sequenceContainer) {
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
    explanationAccordionBtn.disabled = true;
    collapseAccordion(explanationAccordion);
    eraseLastCodon = sequenceContainer.lastChild.textContent;
    if ( sequenceContainer.lastChild.tagName == "SPAN") {
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

      if (sequenceContainer.lastChild != null && sequenceContainer.lastChild.tagName == "SPAN") {

        if (sequenceContainer.lastChild.classList[1].split("_").pop() == 3) {
          color_index = 3;
        }
        color_index = parseInt(sequenceContainer.lastChild.classList[2].split("_").pop()) + 1;
        beforeEnteringText.classList.add("before_entering_text__faded");
        explanationAccordionBtn.disabled = false;

      }
      
    }
  } 
  if (sequenceContainer.innerHTML.length == 0) {
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
  for (i = 0; i < spinner.childElementCount; i++) {
    options[i].style.backgroundColor = "#FAE0E0";
    options[i].style.color = "#000";
  }
  let selected = document.querySelector(`#spinner_item_${spinner.options[spinner.selectedIndex].value}`);
  selected.style.backgroundColor = "#E04F60";
  selected.style.color = "white";
});

spinner.addEventListener("change", function() {
  if (sequenceContainer.textContent.length != 0) {
    clearAllFields();
  }
  switch (parseInt(spinner.options[spinner.selectedIndex].value)) {
    case 0:
      firstResultHead.textContent = "mRNA";
      secondResultHead.textContent = "tRNA";
      thymineBtn.textContent = "T";
      DnaIsMatrixCheckbox.disabled = false;
      customCheckboxContainer.style.opacity = "1";
      break;

    case 1: 
      firstResultHead.textContent = "DNA";
      secondResultHead.textContent = "tRNA";
      thymineBtn.textContent = "U";
      DnaIsMatrixCheckbox.disabled = true;
      DnaIsMatrixCheckbox.checked = false;
      customCheckboxContainer.style.opacity = ".5";
      break;

    case 2: 
      firstResultHead.textContent = "DNA";
      secondResultHead.textContent = "mRNA";
      thymineBtn.textContent = "U";
      DnaIsMatrixCheckbox.disabled = true;
      DnaIsMatrixCheckbox.checked = false;
      customCheckboxContainer.style.opacity = ".5";
      break;
  }
});


document.addEventListener('keydown', (event) => {
  switch(event.key) {
    case "Backspace":
      eraseLast();
      performClick(eraseBtn);
      collapseAccordion(explanationAccordion);
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

explanationAccordion.addEventListener("click", () => {
  if (!explanationAccordionBtn.disabled) {
    let explanationFields = Array.from(document.querySelector('.explanation-list').children);
    let spinnerSelected = parseInt(spinner.options[spinner.selectedIndex].value);
    switch(spinnerSelected) {
      case ID_DNA:
        if (DnaIsMatrixCheckbox.checked) {
          explanationFields.forEach( (field, i) => {
            field.innerHTML = explanationForMatrixDNA[i];
          });
        } else {
          explanationFields.forEach( (field, i) => {
            field.innerHTML = explanationForDNA[i];
          });
        }
        break;

      case ID_mRNA: 
        explanationFields.forEach( (field, i) => {
            field.innerHTML = explanationForMRNA[i];
          });
        break;

      case ID_tRNA: 
        explanationFields.forEach( (field, i) => {
            field.innerHTML = explanationForTRNA[i];
          });
    }
  }
});