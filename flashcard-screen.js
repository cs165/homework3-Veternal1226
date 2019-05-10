// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.flashcardContainer = containerElement.querySelector('#flashcard-container');
    this.correctContainer = containerElement.querySelector('.status .correct');
    this.incorrectContainer = containerElement.querySelector('.status .incorrect');

    this.allQuestions=null;
    this.allAnswers=null;
    this.deck=[];
    this.index=-1;
    this.totalCards=0;
    this.totalRight=0;
    this.totalWrong=0;
    this.nowCard=null;
    this.tempRight=0;
    this.tempWrong=0;

    this.drawCard=this.drawCard.bind(this);
    this.dragInside=this.dragInside.bind(this);
    this.dragOutside=this.dragOutside.bind(this);
    document.addEventListener('dragInside', this.dragInside);
    document.addEventListener('dragOutside', this.dragOutside);
  }

  /*show() {
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    const card = new Flashcard(flashcardContainer, 'word', 'definition');
  }*/

  init(index){
    this.index=index;
    if(this.totalCards === 0) {
      this.allQuestions=FLASHCARD_DECKS[index].words;
      this.allAnswers=Object.keys(this.allQuestions);
      //console.log(this.allQuestions);
      //console.log(this.allAnswers);
      this.createFlashcard();
    }
  }

  show(){
    this.containerElement.classList.remove('inactive');
    this.correctContainer.textContent=this.totalRight;
    this.incorrectContainer.textContent=this.totalWrong;
    this.drawCard();
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  reset() {
    for(let i=0; i<this.totalCards; i++) {
      this.deck.splice(0,1);
    }
    this.allQuestions=null;
    this.allAnswers=null;
    this.index=-1;
    this.totalCards=0;
    this.totalRight=0;
    this.totalWrong=0;
    this.tempRight=0;
    this.tempWrong=0;
  }

  createFlashcard() {
    this.totalCards=this.allAnswers.length;
    for(let i=0; i<this.totalCards; i++) {
      const card=new Flashcard(this.flashcardContainer, this.allAnswers[i], this.allQuestions[this.allAnswers[i]]);
      this.deck.push(card);
    }
  }

  drawCard() {
    if(this.totalCards !== 0) {
      this.nowCard=this.deck.splice(0,1).pop();
      this.nowCard.show();
      this.totalCards--;
    }
  }
  dragInside(event) {
    this.tempRight=event.detail.right; 
    this.tempWrong=event.detail.wrong;
    this.correctContainer.textContent=this.totalRight+this.tempRight;
    this.incorrectContainer.textContent=this.totalWrong+this.tempWrong;
  }

  dragOutside(event) {
    this.totalRight+=this.tempRight;
    this.totalWrong=this.totalWrong+this.tempWrong;
    this.nowCard.hide();
    if(this.tempWrong === 1) {
      this.deck.push(this.nowCard);
    }

    if(this.totalCards === 0) {
      document.dispatchEvent(new CustomEvent('toResult', {detail: {right:this.totalRight,wrong:this.totalWrong,titleIndex:this.index} } ));
      //for redo wrong question
      this.totalCards=this.totalWrong;
      this.totalWrong=0;
    }else {
      this.drawCard();
    }
  }

}
