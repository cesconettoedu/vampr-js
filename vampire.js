class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
    addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }
  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentOffspring = this;

      while (currentOffspring.creator) {
      currentOffspring = currentOffspring.creator;
      numberOfVampires++;
    }
    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if(this.creator === null){
      return true
    }
    
    if(vampire.creator === null) {
      return false
    }
  
    if(this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true
    }
    return false
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if(this.name === vampire.name){
      return this
    }
    
    if(this.numberOfVampiresFromOriginal <= 2) {
      if(this.creator === null){
        return this
      }
      return this.creator
    }

    if(vampire.numberOfVampiresFromOriginal <= 2) {
      if(vampire.creator === null){
        return vampire
      }
      return vampire.creator
    }
  
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return this
    } 
    return vampire;
  }
}

module.exports = Vampire;

