// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.choiceList=[];
    this.createChoices();
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  createChoices(){
    for(const src of FLASHCARD_DECKS){
      const choice=new Choice(this.containerElement,src.title);
      this.choiceList.push(choice);
    }
  }
}

class Choice{
  constructor(containerElement, choiceTitle) {
    this.containerElement=containerElement.querySelector('#choices');
    this.title=choiceTitle;
    this.index=-1;

    this.changeMain=this.changeMain.bind(this);

    this.newChoice=document.createElement('div');
    this.newChoice.textContent=this.title;
    this.newChoice.addEventListener('click', this.changeMain);
    this.containerElement.append(this.newChoice);
  }

  changeMain() {
    this.index=FLASHCARD_DECKS.map(function(item){return item.title;}).indexOf(this.title);
    //console.log(this.index);
    document.dispatchEvent(new CustomEvent('toMain', {detail: {titleIndex: this.index} } ));
  }
}
