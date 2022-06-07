import { DomHelper } from '../dom/DomHelper';
import SelectorEngine from '../dom/selectorEngine';

class Menu {
  constructor(hookElementId) {
    this.hookElement = document.querySelector(hookElementId);
  }
  itemHover(itemELementId, callbackMousehover, callbackMouseLeave) {
    this.menuItems = SelectorEngine.find(itemELementId, this.hookElement);
    this.menuItems.forEach((item) => {
      item.addEventListener(
        'mouseenter',
        callbackMousehover.bind(null, item, this.menuItems)
      );
      item.addEventListener(
        'mouseleave',
        callbackMouseLeave.bind(null, item, this.menuItems)
      );
    });
  }
}

export class SiteMenu extends Menu {
  constructor() {
    super('.site_menu');
    this.init();
  }

  init() {
    this.itemHover(
      '.menu_item',
      this.subMenuItemMouseEnter.bind(this),
      this.subMenuItemMouseLeave.bind(this)
    );
    new SubMenu();
  }
  subMenuItemMouseEnter = (item) => {
    const subMenuDivEL = item.querySelector('.sub_menu_div');
    if (subMenuDivEL !== null) {
      item.querySelector('#sub-menu-div').classList.add('visible');
      item.querySelector('.sub_menu_div_back').classList.add('visible');
      DomHelper.toggelPositionHeaderBottomFix();
      DomHelper.showBackDrop();
    }
  };
  subMenuItemMouseLeave(item) {
    const subMenuDivEL = item.querySelector('.sub_menu_div');
    if (subMenuDivEL !== null) {
      item.querySelector('#sub-menu-div').classList.remove('visible');
      item.querySelector('.sub_menu_div_back').classList.remove('visible');
      DomHelper.toggelPositionHeaderBottomFix();
      DomHelper.hideBackDrop();
    }
  }
}

class SubMenu extends Menu {
  constructor() {
    super('.sub_menu');
    this.init();
  }
  init() {
    this.itemHover(
      '.sub_menu_item',
      this.subMenuItemElMouseEnter.bind(this),
      this.subMenuItemElMouseLeave.bind(this)
    );

    //Set First Element Style
    this.setStyleItemHover(
      this.hookElement.firstElementChild,
      true,
      'select',
      'blue'
    );
    const firstSubMenuDivision = this.hookElement.querySelector(
      '.sub_menu_item_divi'
    );
    this.setStyleItemHover(firstSubMenuDivision, false, 'visible');
  }
  setStyleItemHover(item, addFirstchild, ...classNames) {
    item.classList.add(classNames[0]);
    if (addFirstchild) item.firstElementChild.classList.add(classNames[1]);
  }
  clearStyleItemHover(item, ...className) {
    item.classList.remove(className[0]);
    item.firstElementChild.classList.remove(className[1]);
  }

  subMenuItemElMouseEnter(item, hookElements) {
    hookElements.forEach((item) => {
      this.clearStyleItemHover(item, 'select', 'blue');
      item.querySelector('.sub_menu_item_divi').classList.remove('visible');
    });
    this.setStyleItemHover(item, true, 'select', 'blue');
    const subMenDivisionEl = item.querySelector('.sub_menu_item_divi');
    this.setStyleItemHover(subMenDivisionEl, false, 'visible');
  }
  subMenuItemElMouseLeave(item) {
    try {
      if (e.relatedTarget.className == 'sub_menu_item') {
        this.clearStyleItemHover(item, 'select', 'blue');
      }
    } catch (error) {
      return;
    }
  }
}
