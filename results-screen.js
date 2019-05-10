// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.percentContainer = containerElement.querySelector('.percent');
    this.correctContainer = containerElement.querySelector('.correct');
    this.incorrectContainer = containerElement.querySelector('.incorrect');
    this.continueContainer = containerElement.querySelector('.menu-buttons .continue');
    this.toMenuContainer = containerElement.querySelector('.menu-buttons .to-menu');
    
    this.index=-1;

    this.redoMain=this.redoMain.bind(this);
    this.resetToMain=this.resetToMain.bind(this);

    this.toMenuContainer.addEventListener('click', this.backtoMenu);
  }

  /*show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');
  }*/

  show(nCorrect, nWrong, index) {
    this.containerElement.classList.remove('inactive');
    this.index=index;
    const percent=Math.round(nCorrect/(nCorrect+nWrong)*100);
    this.percentContainer.textContent=percent;
    this.correctContainer.textContent=nCorrect;
    this.incorrectContainer.textContent=nWrong;
    if(nWrong != 0) {
      this.continueContainer.textContent='Continue';
      this.continueContainer.removeEventListener('click', this.resetToMain);
      this.continueContainer.addEventListener('click', this.redoMain);
    }else {
      this.continueContainer.textContent='Start over?';
      this.continueContainer.removeEventListener('click', this.redoMain);
      this.continueContainer.addEventListener('click', this.resetToMain);
    }
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  backtoMenu() {
    document.dispatchEvent(new CustomEvent('toMenu'));
  }

  redoMain() {
    document.dispatchEvent(new CustomEvent('toMain', {detail: {titleIndex: this.index} } ));
  }

  resetToMain() {
    document.dispatchEvent(new CustomEvent('resetToMain', {detail: {titleIndex: this.index} } ));
  }
}
