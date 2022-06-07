// ('use strict');

import { DomHelper } from '../dom/DomHelper';
import selectorEngin from '../dom/selectorEngine';
import { AsBaseComponent } from './base-component';

const SUBMENU_SELECTOR = '.asid-menu-sub';
const ASIDE_MENU_ITEM_SELECTOR = '.aside-menu-item';
const ASIDE_ARROW_SELECTOR = '.aside-menu-arrow';

const SUBMENU_SHOW_CLASSNAME = 'show';

const NAME = 'aside';

class Aside extends AsBaseComponent {
  _isOpen = false;
  constructor(element) {
    super(element);

    this._asideItems = selectorEngin.find(
      ASIDE_MENU_ITEM_SELECTOR,
      this._element
    );

    this._init();
  }

  // initialize
  _init() {
    this._itemsHandler();
    this._openAsideMobile();
    this._hide();
  }
  _hide() {
    const backDrop = DomHelper.getBackDrop();
    backDrop.addEventListener('click', () => {
      if (DomHelper.hasClass(this._element, 'active')) {
        this._element.classList.remove('active');
        DomHelper.hideBackDrop();
        this._resetItems();
      } else {
        return;
      }
    });
  }

  // aside Toggle
  _toggleAside() {
    if (this._isOpen === true) {
      this._showArrow();
      this._showTitle();
      this._incAideWidth();
    } else {
      this._resetItems();
      this._hideArrow();
      this._hideTitle();
      this._decAsideWidth();
    }

    this._hideAsideContent();
    this._asideOffCanvasLogo();
    this._rotateBtnToggle();
    this._isOpen = !this._isOpen;
  }

  _offCanvasHandler() {
    const toggleButtonEl = selectorEngin.findOne(
      '.aside-btn-toggle',
      this._element
    );
    toggleButtonEl.addEventListener('click', this._toggleAside.bind(this));
  }

  // menu items behovior
  _itemsHandler() {
    this._asideItems = selectorEngin.find(
      ASIDE_MENU_ITEM_SELECTOR,
      this._element
    );
    this._asideItems.forEach((item) => {
      item.addEventListener('click', this._toggleSub.bind(this, item));
    });
  }

  // show subMennu
  _showSub(itemElement) {
    if (!this._hasSubMenu(itemElement)) {
      return;
    }
    const subMenuEl = this._getInstanceSubMenu(itemElement);

    if (!subMenuEl) {
      return;
    }
    DomHelper.addCLassName(subMenuEl, SUBMENU_SHOW_CLASSNAME);
    this._arrowDown(itemElement);
  }
  // hide subMenu
  _hideSub(itemElement) {
    if (!this._hasSubMenu(itemElement)) {
      return;
    }
    const subMenuEl = this._getInstanceSubMenu(itemElement);

    if (!subMenuEl) {
      return;
    }
    DomHelper.removeClassName(subMenuEl, SUBMENU_SHOW_CLASSNAME);
    this._arrowUp(itemElement);
  }

  // toggle SubMenu
  _toggleSub(itemElement) {
    // if Offcanvas true return

    if (this._isOpen) {
      return;
    }
    return this._subIsShow(itemElement)
      ? this._hideSub(itemElement)
      : this._showSub(itemElement);
  }

  // subMenu Is Show!!
  _subIsShow(itemElement) {
    if (!this._hasSubMenu(itemElement)) {
      return false;
    }
    const subMenu = this._getInstanceSubMenu(itemElement);
    if (DomHelper.hasClass(subMenu, 'show')) {
      return true;
    }
    return false;
  }

  /// item has subMenu ?
  _hasSubMenu(element) {
    return DomHelper.hasChild(element, SUBMENU_SELECTOR);
  }

  // get instance subMenu
  _getInstanceSubMenu(item) {
    return selectorEngin.findOne(SUBMENU_SELECTOR, item);
  }

  _arrowDown(itemEl) {
    const arrow = selectorEngin.findOne(ASIDE_ARROW_SELECTOR, itemEl);
    arrow.classList.add('rotate');
  }

  _arrowUp(itemEl) {
    const arrow = selectorEngin.findOne(ASIDE_ARROW_SELECTOR, itemEl);
    arrow.classList.remove('rotate');
  }

  // reset AsideItems
  _reset_asideItems() {
    const allSubMenu = selectorEngin.find(SUBMENU_SELECTOR, this._element);
    allSubMenu.forEach((item) => {
      item.classList.remove('show');
    });
    const allArrows = selectorEngin.find(ASIDE_ARROW_SELECTOR, this._element);
    allArrows.forEach((item) => {
      item.classList.remove('rotate');
    });
  }

  // hide asde content title
  _hideAsideContent() {
    const contents = selectorEngin.find('.menu-content', this._element);
    contents.forEach((content) => {
      content.classList.toggle('hide');
    });
  }

  _showAsideContent() {
    if (this._isOpen) {
      const contents = selectorEngin.find('.menu-content', this._element);
      contents.forEach((content) => {
        content.classList.remove('hide');
      });
    }
  }

  // hide aside title Item
  _hideTitle() {
    if (!this._isOpen) {
      const titles = selectorEngin.find('.aside-menu-title', this._element);
      titles.forEach((title) => {
        title.classList.add('hide');
      });
    }
  }

  _showTitle() {
    const titles = selectorEngin.find('.aside-menu-title', this._element);
    titles.forEach((title) => {
      title.classList.remove('hide');
    });
  }

  _hideArrow() {
    const titles = selectorEngin.find('.aside-menu-arrow', this._element);
    titles.forEach((title) => {
      title.classList.add('hide');
    });
  }

  _showArrow() {
    const titles = selectorEngin.find('.aside-menu-arrow', this._element);
    titles.forEach((title) => {
      title.classList.remove('hide');
    });
  }

  _decAsideWidth() {
    this._element.style.width = '75px';
    const warraper = selectorEngin.findOne('.wrapper');
    warraper.classList.add('fix');
  }

  _incAideWidth() {
    this._element.style.width = '285px';
    const warraper = selectorEngin.findOne('.wrapper');
    warraper.classList.remove('fix');
  }

  _openAsideMobile() {
    const asideMobileBtn = selectorEngin.findOne('.aside-mobile-toggle');

    if (asideMobileBtn === null) {
      return;
    }
    asideMobileBtn.addEventListener('click', this._openAsideHandler.bind(this));
  }

  _openAsideHandler() {
    this._element.classList.add('active');
    DomHelper.showBackDrop();
  }

  static get NAME() {
    return NAME;
  }
}

export default {
  initAside() {
    const asideEl = selectorEngin.find('.aside');
    if (!asideEl) {
      return;
    }
    asideEl.map((element) => {
      new Aside(element);
    });
  },
};
