// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (number, dnaArray) => {
  return {
    specimenNum: number,
    dna: dnaArray,
    mutate() {
      const random = Math.floor(Math.random() * dnaArray.length);
      const baseNotA = ['T', 'C', 'G'];
      const baseNotT = ['A', 'C', 'G'];
      const baseNotC = ['T', 'A', 'G'];
      const baseNotG = ['T', 'C', 'A'];
      if (this.dna[random] === 'A') {
        this.dna[random] = baseNotA[Math.floor(Math.random() * 3)];
      } else if (this.dna[random] === 'T') {
        this.dna[random] = baseNotT[Math.floor(Math.random() * 3)];
      } else if (this.dna[random] === 'C') {
        this.dna[random] = baseNotC[Math.floor(Math.random() * 3)];
      } else if (this.dna[random] === 'G') {
        this.dna[random] = baseNotG[Math.floor(Math.random() * 3)];
      }
      return this.dna;
    },
    compareDNA(pAequor) {
      let count = 0;
      for (let index = 0; index < pAequor.dna.length; index++) {
        if (pAequor.dna[index] === this.dna[index]) {
          count++;
        }
      }
      const compare = ((count / pAequor.dna.length) * 100).toFixed(2);

      console.log(
        `specimen #${pAequor.specimenNum} and specimen #${this.specimenNum} have ${compare}% DNA in common`
      );
    },
    willLikelySurvive() {
      let countC = 0;
      let countG = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C') {
          countC++;
        }
      }
      for (let n = 0; n < this.dna.length; n++) {
        if (this.dna[n] === 'G') {
          countG++;
        }
      }

      if (countC > this.dna.length * 0.6 || countG > this.dna.length * 0.6) {
        return true;
      } else {
        return false;
      }
    },
  };
};

// Creating 30 pAequor that are likely to survive
const survivors = [];
while (survivors.length < 30) {
  pAequorNumber = survivors.length + 1;
  newPAequor = pAequorFactory(pAequorNumber, mockUpStrand());
  if (newPAequor.willLikelySurvive() === true) {
    survivors.push(newPAequor);
  }
}
console.log(survivors);

const testP = pAequorFactory(1, mockUpStrand());
console.log(testP.dna);
//testP.mutate();
//console.log(testP.mutate());
//const testP2 = pAequorFactory(2, mockUpStrand());
//console.log(testP2.dna);
//console.log(testP2.mutate());
//testP.compareDNA(testP2);
console.log(testP.willLikelySurvive());
