// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    this.toMenu=this.toMenu.bind(this);
    this.toMain=this.toMain.bind(this);
    this.toResult=this.toResult.bind(this);
    this.resetToMain=this.resetToMain.bind(this);

    document.addEventListener('toMenu', this.toMenu);
    document.addEventListener('toMain', this.toMain);
    document.addEventListener('toResult', this.toResult);
    document.addEventListener('resetToMain', this.resetToMain);
    // Uncomment this pair of lines to see the "flashcard" screen:
    // this.menu.hide();
    // this.flashcards.show();

    // Uncomment this pair of lines to see the "results" screen:
    // this.menu.hide();
    // this.results.show();
  }
  toMenu() {
    this.flashcards.reset();
    this.menu.show();
    this.flashcards.hide();
    this.results.hide();
  }

  toMain(event) {
    this.flashcards.init(event.detail.titleIndex);
    this.menu.hide();
    this.flashcards.show();
    this.results.hide();
  }

  toResult(event) {
    this.menu.hide();
    this.flashcards.hide();
    this.results.show(event.detail.right, event.detail.wrong, event.detail.titleIndex);
  }

  resetToMain(event) {
    this.flashcards.reset();
    this.flashcards.init(event.detail.titleIndex);
    this.menu.hide();
    this.flashcards.show();
    this.results.hide();
  }
}
