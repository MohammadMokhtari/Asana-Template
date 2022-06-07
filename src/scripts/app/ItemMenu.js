import { DomHelper } from '../dom/DomHelper';
import SelectorEngine from '../dom/selectorEngine';

export class ItemMenu {
  constructor(itemEl, ownerEl, callBackEvent) {
    this.id = itemEl.id;
    this.active = active;
    this.itemElement = itemEl;
    this.ownerElement = ownerEl;
    this.mouseEnter(callBackEvent);
    this.mouseLeave(callBackEvent);
  }

  mouseEnter(callBackEvent) {
    this.itemElement.addEventListener('mouseenter', () => {
      const subMenuDivEL = SelectorEngine.findOne(
        '.Sub-menu',
        this.itemElement
      );
      if (subMenuDivEL !== null) {
        const subMenuDivBack = SelectorEngine.findOne(
          '#sub-menu-div',
          this.itemElement
        );
        subMenuDivEL.classList.add('visible');
        subMenuDivBack.classList.add('visible');
        DomHelper.showBackDrop();
        callBackEvent();
      } else return;
    });
  }
  mouseLeave(callBackEvent) {
    this.itemElement.addEventListener('mouseleave', () => {
      const subMenuDivEL = this.itemElement.querySelector('.Sub-menu');
      const subMenuDivEL = SelectorEngine.findOne(
        '.Sub-menu',
        this.itemElement
      );
      if (subMenuDivEL !== null) {
        const subMenuDivBack = SelectorEngine.findOne('Sub-menu-div', this);
        subMenuDivEL.classList.remove('visible');
        subMenuDivBack.classList.remove('visible');
        DomHelper.hideBackDrop();
        callBackEvent();
      } else return;
    });
  }
}
