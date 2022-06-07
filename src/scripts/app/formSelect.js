import { AsBaseComponent } from './base-component';
import selectorEngine from '../dom/selectorEngine';
import { DomHelper } from '../dom/DomHelper';
import EventHandler from '../dom/eventHandler';

// constans
const CLASS_NAME_OPEN = 'active';
const OPTION_MEN_SELECTOR = '.select-box';
const SEARCH_OPTION_SELECTOR = '#search-options';
const SELECT_BUTTON_SELCTOR = '#selected-btn';
const OPTION_CONTAINER_SELECTOR = '.option-container';
const SELECTS_CLASS_NAME_SELECTOR = '.select-container';

const NAME = 'Select';

export class formSelect extends AsBaseComponent {
  constructor(element) {
    super(element);

    this._selectOptionMenu = this._getSelectOptionMenu();

    this.optionContainerEl = this._getSelectOptionContainer();

    this._show = false;

    this._disabled = this._IsDisabled();

    this.selectButtonEl = this._getSelectButton();

    this._init();
  }

  static get NAME() {
    return NAME;
  }

  _init() {
    this._selectClickHandler();

    this._optionSelectHandler();
  }

  _selectClickHandler() {
    EventHandler.addEvent(this.selectButtonEl, 'click', this.toggle.bind(this));
  }

  toggle() {
    if (this._IsDisabled()) {
      return;
    }
    return this._isShown() ? this.hide() : this.show();
  }
  // show Option Select
  show() {
    if (this._isShown(this._selectOptionMenu)) {
      return;
    }

    const selectsMenus = selectorEngine.find(SELECTS_CLASS_NAME_SELECTOR);
    selectsMenus.forEach((select) => {
      const context = formSelect.getInstance(select);
      context.hide();
    });

    DomHelper.addCLassName(this._element, CLASS_NAME_OPEN);
    DomHelper.addCLassName(this._selectOptionMenu, CLASS_NAME_OPEN);
    this._focucInputSearch();
  }

  // close option select
  hide() {
    if (this._isShown(this._selectOptionMenu)) {
      DomHelper.removeClassName(this._element, CLASS_NAME_OPEN);
      DomHelper.removeClassName(this._selectOptionMenu, CLASS_NAME_OPEN);
    }
  }

  reset() {
    this._isShown = false;
    this.hide();
  }

  _optionSelectHandler() {
    this.optionContainerEl.addEventListener('click', (event) => {
      if (event.target.nextElementSibling === null) {
        return;
      }
      const optionValue = event.target.nextElementSibling.textContent;
      const options = selectorEngine.find('.option', this.optionContainerEl);

      options.forEach((option) => {
        const label = selectorEngine.findOne('label', option);
        DomHelper.removeClassName(label, 'active');
      });

      DomHelper.addCLassName(event.target.nextElementSibling, 'active');

      const selectedLableEL = selectorEngine.findOne(
        '.selected-labal',
        this._element
      );

      selectedLableEL.textContent = optionValue;

      this.hide();
    });
  }

  _isShown(element = this._element) {
    return DomHelper.hasClass(element, 'active');
  }

  _IsDisabled() {
    return DomHelper.hasClass(this._element, 'disabled');
  }

  _getSelectButton() {
    return selectorEngine.findOne(SELECT_BUTTON_SELCTOR, this._element);
  }

  _getSelectOptionMenu() {
    return selectorEngine.findOne(OPTION_MEN_SELECTOR, this._element);
  }

  _getSelectOptionContainer() {
    return selectorEngine.findOne(OPTION_CONTAINER_SELECTOR, this._element);
  }

  _focucInputSearch() {
    const inputSearch = selectorEngine.findOne(
      SEARCH_OPTION_SELECTOR,
      this._element
    );
    inputSearch.focus();
  }

  // _stopEventBubbling() {
  //   this._element.addEventListener('click', (event) => {});
  // }

  static clearMenu() {
    if (
      !event.target.closest(SELECTS_CLASS_NAME_SELECTOR) ||
      event.target.closest(SELECTS_CLASS_NAME_SELECTOR).length === 0
    ) {
      const selectsMenus = selectorEngine.find(SELECTS_CLASS_NAME_SELECTOR);
      selectsMenus.forEach((select) => {
        const context = formSelect.getInstance(select);
        if (!context) {
          return;
        }
        context.hide();
      });
    } else return;
  }
}

//
//
EventHandler.addEvent(document, 'click', formSelect.clearMenu);
