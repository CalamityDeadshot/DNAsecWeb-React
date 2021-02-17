export const INCOMPLETE_SEQUENCE = "Attention: incomplete sequence"
export const ID_DNA = 0;
export const ID_mRNA = 1;
export const ID_tRNA = 2;
export const ADENINE = "A";
export const URACIL = "U";
export const GUANINE = "G";
export const CYTOSINE = "C";

export const phenylalanine_short = "Phe";
export const leucine_short = "Leu";
export const isoleucine_short = "Ile";
export const methionine_short = "Met";
export const valine_short = "Val";
export const serine_short = "Ser";
export const proline_short = "Pro";
export const threonine_short = "Thr";
export const tyrosine_short = "Tyr";
export const alanine_short = "Ala";
export const stop_short = "———";
export const histidine_short = "His";
export const glutamine_short = "Gln";
export const asparagine_short = "Arg";
export const lysine_short = "Lys";
export const aspartic_acid_short = "Asp";
export const glutamine_acid_short = "Glu";
export const cysteine_short = "Cys";
export const tryptophan_short = "Trp";
export const arginine_short = "Arg";
export const glycine_short = "Gly";

export const explanationForDNA = [
  'By the <a class="link_regular" href="https://en.wikipedia.org/wiki/Complementarity_(molecular_biology)">principle of complementarity</a>, mRNA is synthesized on the template DNA (transcription process).',
  'The translation process occurs in the ribosome. <br>Transport RNA (tRNA) molecules, the anticodons of which are complementary to the mRNA codons in the ribosome, recognize the mRNA sequence',
  'After the tRNA molecules recognize the mRNA codons, the amino acids (AA) of the corresponding tRNA are attached to each other (with the formation of a peptide bond), forming a protein chain.'
];

export const explanationForMatrixDNA = [
  'All types of RNA are synthesized on a DNA matrix. <br>Then, by the <a class="link_regular" href="https://en.wikipedia.org/wiki/Complementarity_(molecular_biology)">principle of complementarity</a>, tRNA is synthesized on the template DNA.',
  'According to the principle of complementarity, based on tRNA anticodons, we find the nucleotide sequence of mRNA codons.',
  'Based on the mRNA codons, the amino acid sequence is synthesized.'
];

export const explanationForMRNA = [
  'Using the <a class="link_regular" href="https://en.wikipedia.org/wiki/Complementarity_(molecular_biology)">principle of complementarity</a>, it is possible to reconstruct the DNA fragment, which was a basis for mRNA synthesis.',
  explanationForDNA[1],
  explanationForDNA[2]
];

export const explanationForTRNA = [
  'Using the <a class="link_regular" href="https://en.wikipedia.org/wiki/Complementarity_(molecular_biology)">principle of complementarity</a>, it is possible to reconstruct the mRNA fragment recognized by the tRNA anticodons',
  'Using the principle of complementarity, it is possible to reconstruct the DNA fragment, which was a basis for mRNA synthesis.',
  explanationForDNA[2]
];