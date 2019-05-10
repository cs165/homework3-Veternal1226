// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText) {
    this.containerElement = containerElement;
    this.body=document.querySelector('body');

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);

    this._flipCard = this._flipCard.bind(this);
    this._initCard=this._initCard.bind(this);
    this._moveCard=this._moveCard.bind(this);
    this._releaseCard=this._releaseCard.bind(this);

    this.flashcardElement.addEventListener('pointerup', this._flipCard);
    this.flashcardElement.addEventListener('pointerdown', this._initCard);
    this.flashcardElement.addEventListener('pointermove', this._moveCard);
    this.flashcardElement.addEventListener('pointerup', this._releaseCard);
  }

  show() {
    this.containerElement.append(this.flashcardElement);
  }

  hide() {
    this.containerElement.removeChild(this.flashcardElement);
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    if(this.originX === event.clientX && this.originY === event.clientY)
    this.flashcardElement.classList.toggle('show-word');
  }

  _initCard(event) {
    //console.log(event);
    this.originX=event.clientX;
    this.originY=event.clientY;
  }

  _moveCard(event) {
    if(this.originX || this.originY) {
      const deltaX=event.clientX-this.originX;
      const deltaY=event.clientY-this.originY;
      event.currentTarget.style.transition='';
      event.currentTarget.style.transform='translate('+deltaX+'px, '+deltaY+'px) rotate('+deltaX*0.2+'deg)';
      if(deltaX >= 150) {
        this.body.classList.add('out');
        this.right=1;
        this.wrong=0;
      }
      else if(deltaX <=-150) {
        this.body.classList.add('out');
        this.right=0;
        this.wrong=1;
      }
      else {
        this.body.classList.remove('out');
        this.right=0;
        this.wrong=0;
      }
      document.dispatchEvent(new CustomEvent('dragInside', {detail: {right:this.right,wrong:this.wrong} } ));
    }
  }

  _releaseCard(event) {
    const deltaX=event.clientX-this.originX;
    if(deltaX >= 150 || deltaX <=-150) {
      this.flashcardElement.classList.add('show-word');
      document.dispatchEvent(new CustomEvent('dragOutside', {detail: {right:this.right,wrong:this.wrong} } ));
    }
    event.currentTarget.style.transition='0.6s';
    event.currentTarget.style.transform='';
    this.originX=null;
    this.originY=null;
    this.body.classList.remove('out');
  }
}
