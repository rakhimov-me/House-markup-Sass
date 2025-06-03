const rootSelector = '[data-js-tabs]';

class Tabs {
  selectors = {
    button: '[data-js-tabs-button]',
    content: '[data-js-tabs-content]',
  };
  stateClasses = {
    isActive: 'is-active',
  };
  stateAttributes = {
    ariaSelected: 'aria-selected',
    tabIndex: 'tabindex',
  };

  constructor(rootElement) {
    this.rootElement = rootElement;
    this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button);
    this.contentElements = this.rootElement.querySelectorAll(this.selectors.content);

    this.state = {
      activeTabIndex: [...this.buttonElements]
        .findIndex(button =>
          button.classList.contains(this.stateClasses.isActive)
        )
    };

    // максимально возможный индекс
    this.limitTabsIndex = this.buttonElements.length - 1;

    this.bindEvents();
    this.updateUI(); // применить начальный вид
  }

  updateUI() {
    const { activeTabIndex } = this.state;

    this.buttonElements.forEach((button, index) => {
      const isActive = index === activeTabIndex;

      button.classList.toggle(this.stateClasses.isActive, isActive);
      button.setAttribute(this.stateAttributes.ariaSelected, isActive);
      button.setAttribute(this.stateAttributes.tabIndex, isActive ? 0 : -1);
    });

    this.contentElements.forEach((panel, index) => {
      const isActive = index === activeTabIndex;
      panel.classList.toggle(this.stateClasses.isActive, isActive);
    });
  }

  onButtonClick(buttonIndex) {
    this.state.activeTabIndex = buttonIndex;
    this.updateUI(); // обязательно вызвать функцию
  }

  bindEvents() {
    this.buttonElements.forEach((button, index) => {
      button.addEventListener('click', () => this.onButtonClick(index));
    });
  }
}

class TabsCollection {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll(rootSelector)
      .forEach(rootEl => {
        new Tabs(rootEl);
      });
  }
}

export default TabsCollection;
