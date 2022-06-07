import { DomHelper } from '../dom/DomHelper';
import { getScrollTop } from '../dom/scrollBar';
import SelectorEngine from '../dom/selectorEngine';

const HEADER_SECTION_TOP_CLASSNAME = '.header_section_top';
const HEADER_SECTION_BOTTOM_CLASSNAME = '.header_section_bottom';
const SHOW_CLASSNAME = 'visible';
const SUB_LAYER_CLASSNAME = '.subLayer';

export class Header {
  constructor() {
    this.init();
  }
  init() {
    this.headerTop = SelectorEngine.findOne(HEADER_SECTION_TOP_CLASSNAME);
    this.headerBottom = SelectorEngine.findOne(HEADER_SECTION_BOTTOM_CLASSNAME);
    this.documentScroll();
    // this.showProfileInfoButton();
  }
  documentScroll() {
    let lastScrollTop = 0;
    document.addEventListener('scroll', () => {
      const scrollTop = getScrollTop();
      const screenWidth = window.innerWidth;
      if (!this.headerBottom.classList.contains('fixeded')) {
        if (screenWidth > 768) {
          if (scrollTop > lastScrollTop && scrollTop > 150) {
            this.headerBottom.classList.add('fade');
            this.headerTop.classList.add('borderFade');
          } else {
            this.headerBottom.classList.remove('fade');
            this.headerTop.classList.remove('borderFade');
          }
        }
      }
      lastScrollTop = scrollTop;
    });
  }
  showProfileInfoButton() {
    const profileInfoButtonElement = SelectorEngine.findOne(
      '.logged_in_item_s .title',
      this.headerTop
    );
    profileInfoButtonElement.addEventListener('click', (event) => {
      this.subLayer = SelectorEngine.findOne('.sublayer');
      this.subLayer.addEventListener('click', (event) => {
        event.stopPropagation();
      });
      if (this.subLayer.classList.contains('visible')) {
        DomHelper.fadeOutElement(this.subLayer, 'visible');
      } else {
        DomHelper.fadeInElement(this.subLayer, 'visible');
      }
      event.stopPropagation();
    });
  }
}
