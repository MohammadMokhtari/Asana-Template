import { DomHelper } from '../dom/DomHelper';
import SelectorEngine from '../dom/selectorEngine';

export class Collaps {
  constructor() {
    this.CollapsBtnEL = SelectorEngine.find('.js_collaps__btn');
    this.CollapsAutoBtnEL = this.CollapsBtnEL.filter(
      (btn) => btn.dataset.collaps === 'auto'
    );
    this.CollapsEl = [];
    this.CollapsBtnEL.forEach((btn) => {
      this.CollapsEl.push(SelectorEngine.findOne(btn.dataset.target));
    });
    this.clickButtonMenuHandler();
  }
  clickButtonMenuHandler() {
    this.CollapsAutoBtnEL.forEach((btn) => {
      this.show(btn);
    });
  }

  hide() {
    this.CollapsEl.forEach((collapse) => {
      collapse.classList.remove('visible');
    });
    this.CollapsBtnEL.forEach((btn) => {
      btn.classList.remove('active');
    });
  }
  show(element, clallbackFunc) {
    element.addEventListener('click', () => {
      const selectorTarget = element.dataset.target;
      const targetEl = SelectorEngine.findOne(selectorTarget);
      if (!element.classList.contains('active')) {
        if (clallbackFunc !== undefined) {
          clallbackFunc();
        }
        this.hide();
        DomHelper.addCLassName(element, 'active');
        DomHelper.addCLassName(targetEl, 'visible');
      }
    });
  }
}
