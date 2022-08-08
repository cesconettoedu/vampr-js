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
    
    if(!this.creator){
      return this
    }

    if(!vampire.creator){
      return vampire
    }

    if(this.creator === vampire.creator){
      return this.creator
    }

    if(this.numberOfVampiresFromOriginal === vampire.numberOfVampiresFromOriginal){
      return this.creator.closestCommonAncestor(vampire);    
    }

    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal && vampire.numberOfVampiresFromOriginal - this.numberOfVampiresFromOriginal == 1) {
      return this
    }
    
    if (this.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal && this.numberOfVampiresFromOriginal - vampire.numberOfVampiresFromOriginal  == 1) {
      return vampire
    }

    if(this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      let ancestor = vampire
      while (this.creator.numberOfVampiresFromOriginal < ancestor.numberOfVampiresFromOriginal) {
        ancestor = ancestor.creator;
      }
     return ancestor.closestCommonAncestor(vampire)
    }

    if(this.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal) {
      let ancestor = this
      while (vampire.creator.numberOfVampiresFromOriginal < ancestor.numberOfVampiresFromOriginal) {
        ancestor = ancestor.creator;
      }
      return ancestor.closestCommonAncestor(this)
    }

    return vampire;
  }

  // Returns the vampire object with that name, 
  //or null if no vampire exists with that name
  vampireWithName(name) {
    let vampire = null
    
    if (this.name === name){
       vampire = this; 
    } 

    if (vampire === null){
      for(const alvo of this.offspring){
        const localVampire = alvo.vampireWithName(name)
        if(localVampire !== null){
          vampire = localVampire;
        }; 
      } 
    }
   return vampire
  }
  
  // Returns the total number of vampires that exist
  get totalDescendents() {
    
    let totalDesc = 0; 

    for (const descend of this.offspring){
      totalDesc += descend.totalDescendents +1;
    }
    return totalDesc;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
  
    let allMillennial = []; 

    if (this.yearConverted > 1980) {
      allMillennial.push(this); // 2
    }

    for (const yearC of this.offspring) {
      const x = yearC.allMillennialVampires
      allMillennial = allMillennial.concat(x);
    }
    return allMillennial;

  }

}

module.exports = Vampire;

