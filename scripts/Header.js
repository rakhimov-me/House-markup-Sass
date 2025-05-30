class Header {
  selectors = {
    root: '[data-js-header]',
    overlay: '[data-js-overlay]',
    burgerButton: '[data-js-header-burger-button]',
    cartButton: '[data-js-header-cart-button]',
  };

  stateClasses = {
    isActive: 'is-active',
    isLock:   'is-lock',
  };

  constructor() {
    // находим корневой <header>
    this.rootElement         = document.querySelector(this.selectors.root);
    // внутри него — слой с меню
    this.overlayElement      = this.rootElement.querySelector(this.selectors.overlay);
    // и кнопку «бургер»
    this.burgerButtonElement = this.rootElement.querySelector(this.selectors.burgerButton);
    // И кнопку «корзина»
    this.cartButtonElement   = this.rootElement.querySelector(this.selectors.cartButton);

    this.bindEvents();
  }

  bindEvents() {
    this.burgerButtonElement.addEventListener('click', this.onBurgerButtonClick);
  }

  onBurgerButtonClick = () => {
    // переключаем активное состояние бургера
    this.burgerButtonElement.classList.toggle(this.stateClasses.isActive);
    // и слой-меню
    this.overlayElement     .classList.toggle(this.stateClasses.isActive);
    // блокируем/разблокируем скролл у <html>
    document.documentElement.classList.toggle(this.stateClasses.isLock);
    // скрыаем кнопку «корзина»
    this.cartButtonElement.classList.toggle(this.stateClasses.isActive);
  }
}

// экспортируем класс
export default Header;
