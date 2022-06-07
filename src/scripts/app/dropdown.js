// ('use strict'); enable automatcaly

import { AsBaseComponent } from './base-component';
import selectorEngine from '../dom/selectorEngine';
import { DomHelper } from '../dom/DomHelper';
import EventHandler from '../dom/eventHandler';

const MENU_SELECTOR = '.dropdown__menu';
const DROPDOWN_SELECTOR = '.dropdown__container';
const DROPDOWN_BUTTON_SELECTOR = '.dropdown__btn';

const SHOW_CLASSNAME = 'active';

const NAME = 'dropDown';

class Dropdown extends AsBaseComponent {
  constructor(element) {
    super(element);

    this._menu = this._getMenuInstance();

    this._dropdownBtn = this._getDropdownButtonInstance();

    this._init();
  }
  _init() {
    this.dropdownButtonHandler();
  }

  dropdownButtonHandler() {
    EventHandler.addEvent(this._dropdownBtn, 'click', this.toggle.bind(this));
  }

  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }

  show() {
    if (this._isShown()) {
      return;
    }
    DomHelper.fadeInElement(this._menu, SHOW_CLASSNAME);
  }
  hide() {
    if (!this._isShown()) {
      return;
    }
    DomHelper.fadeOutElement(this._menu, SHOW_CLASSNAME);
  }

  _getMenuInstance() {
    return selectorEngine.findOne(MENU_SELECTOR, this._element);
  }

  _getDropdownButtonInstance() {
    return selectorEngine.findOne(DROPDOWN_BUTTON_SELECTOR, this._element);
  }

  _isShown() {
    return DomHelper.hasClass(this._menu, SHOW_CLASSNAME);
  }

  // _stopEventBubbling() {
  //   this._element.addEventListener('click', (event) => {});
  // }

  static get NAME() {
    return NAME;
  }

  static clearMenu(event) {
    if (
      !event.target.closest(DROPDOWN_SELECTOR) ||
      event.target.closest(DROPDOWN_SELECTOR).length === 0
    ) {
      const dropdownMenus = selectorEngine.find(DROPDOWN_SELECTOR);
      dropdownMenus.forEach((element) => {
        const context = Dropdown.getInstance(element);
        context.hide();
      });
    } else return;
  }
}

EventHandler.addEvent(document, 'click', Dropdown.clearMenu);

export default {
  initDropdown() {
    //find all dropdowns in document
    const dropdownEls = selectorEngine.find(DROPDOWN_SELECTOR);

    if (!dropdownEls || dropdownEls.length === 0) {
      return;
    }

    dropdownEls.map((element) => {
      new Dropdown(element);
    });
  },
};
