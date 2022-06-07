import { DomHelper } from '../dom/DomHelper';
import SelectorEngine from '../dom/selectorEngine.js';
import {
  hide as hideScrollbar,
  reset as resetScrollBar,
} from '../dom/scrollBar.js';
import { AsBaseComponent } from './base-component';

const CLASS_NAME_SHOW = 'visible';
const MODAL_BUTTON_SELECTOR = '[data-as-toggle="modal"]';

const NAME = 'modal';

class Modal extends AsBaseComponent {
  constructor(element) {
    super(element);

    this._idElement = this._element.id;

    this._ishow = false;

    this.init();
  }

  static get NAME() {
    return NAME;
  }

  init() {
    this._clickModalButton();
    this.clickWrapper();
    this.clickCloseButton();
    this.stopBubblingEvent();
  }

  _toggle() {
    return this._isShown() ? this._hide() : this._show();
  }

  _show() {
    if (!this._isShown()) {
      this._element.style.display = 'flex';
      setTimeout(() => {
        DomHelper.addCLassName(this._element, CLASS_NAME_SHOW);
        hideScrollbar();
      }, 100);
      this._ishow = true;
    }
  }
  _hide() {
    DomHelper.removeClassName(this._element, CLASS_NAME_SHOW);
    setTimeout(() => {
      this._element.style.display = 'none';
    }, 80);
    this._ishow = false;
    resetScrollBar();
  }

  _isShown() {
    return DomHelper.hasClass(this._element, CLASS_NAME_SHOW);
  }

  _clickModalButton() {
    const modalButtonEl = SelectorEngine.findOne(
      `[data-as-target = "${this._idElement}"]${MODAL_BUTTON_SELECTOR}`
    );
    modalButtonEl.addEventListener('click', this._toggle.bind(this));
  }
  clickWrapper() {
    this._element.addEventListener('click', () => {
      this._hide();
    });
  }
  clickCloseButton() {
    const closeModalbtn = SelectorEngine.findOne(
      '.close-modal-btn',
      this._element
    );
    closeModalbtn.addEventListener('click', () => {
      this._hide();
    });
  }
  stopBubblingEvent() {
    const remodalContent = SelectorEngine.findOne(
      '.re-modal-content',
      this._element
    );
    remodalContent.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }
}

export default {
  initModal() {
    const modalsEl = SelectorEngine.find('.modal');
    if (!modalsEl || modalsEl.length === 0) {
      return;
    }
    modalsEl.map((modal) => {
      new Modal(modal);
    });
  },
};
// export default Modal;
