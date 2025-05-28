class FooterColumnsGrid {
  selectors = {
    footerInner:      '.footer__inner',
    socialsContainer: '.footer__extra-soc1als',
    contactsColumn:   '.footer__body-head-contacts .footer__extra-menu-column',
    extraColumns:     '.footer__extra-menu > .footer__extra-menu-column'
  };
  gridClass = 'footer__columns-grid';
  // для хранения информации о том, где были колонки до перемещения
  columnsInfo = null;
  wrapper = null;

  constructor() {
    // ждём загрузки DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupListener());
    } else {
      this.setupListener();
    }
  }

  setupListener() {
    // получаем точный брейкпоинт из CSS-переменной
    const rootStyles = getComputedStyle(document.documentElement);
    const bpValue = rootStyles.getPropertyValue('--breakpoint-tablet-s').trim();
    if (!bpValue) return;

    const media = window.matchMedia(`(max-width: ${bpValue})`);

    // при каждом пересечении брейкпоинта — решаем, что делать
    media.addEventListener('change', e => {
      if (e.matches) this.initGrid();
      else        this.destroyGrid();
    });

    // и сразу один раз
    if (media.matches) this.initGrid();
  }

  initGrid() {
    // если уже обернули — больше не делаем
    if (this.wrapper) return;

    const footerInner = document.querySelector(this.selectors.footerInner);
    const socials     = document.querySelector(this.selectors.socialsContainer);
    const cols = [
      ...document.querySelectorAll(this.selectors.contactsColumn),
      ...document.querySelectorAll(this.selectors.extraColumns)
    ];
    if (!footerInner || !socials || cols.length < 4) return;

    // запомним, где лежали элементы до перемещения
    this.columnsInfo = cols.map(col => ({
      el: col,
      parent: col.parentNode,
      nextSibling: col.nextSibling
    }));

    // создаём обёртку-grid
    const wrapper = document.createElement('div');
    wrapper.classList.add(this.gridClass);
    cols.forEach(col => wrapper.appendChild(col));
    socials.parentNode.insertBefore(wrapper, socials);

    this.wrapper = wrapper;
  }

  destroyGrid() {
    // если не оборачивали — нечего раскатывать
    if (!this.wrapper || !this.columnsInfo) return;

    // возвращаем каждый элемент на своё место
    this.columnsInfo.forEach(({el, parent, nextSibling}) => {
      parent.insertBefore(el, nextSibling);
    });

    // удаляем пустую обёртку
    this.wrapper.remove();
    this.wrapper = null;
    this.columnsInfo = null;
  }
}

export default FooterColumnsGrid;
