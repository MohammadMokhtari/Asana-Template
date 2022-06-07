export class DomHelper {
  static showBackDrop() {
    const backDropEl = document.querySelector('.backDrop');
    backDropEl.classList.add('visible');
  }
  static hideBackDrop() {
    const backDropEl = document.querySelector('.backDrop');
    backDropEl.classList.remove('visible');
  }

  static fadeInElement(element, className = 'visible') {
    element.style.display = 'block';
    setTimeout(() => {
      element.classList.add(className);
    }, 50);
  }
  static getBackDrop() {
    const backDropEl = document.querySelector('.backDrop');
    return backDropEl;
  }
  static fadeOutElement(element, className = 'visible') {
    element.classList.remove(className);
    setTimeout(() => {
      element.style.display = 'none';
    }, 100);
  }
  static toggleElement(element, className) {
    element.classList.toggle(className);
  }
  static toggleClassNaem(element, className) {
    element.classList.toggle(className);
  }
  static addCLassName(element, className) {
    if (element.classList.contains(className)) {
      return;
    }
    element.classList.add(className);
  }
  static removeClassName(element, className) {
    if (!element.classList.contains(className)) {
      return;
    }
    element.classList.remove(className);
  }

  static HideMenu(elementId, className) {
    const element = document.querySelector(elementId);
    window.addEventListener('click', () => {
      if (element.classList.contains(className)) {
        this.fadeOutElement(element, className);
      }
      return;
    });
  }
  static toggleModalBackDrop() {
    const modalBackDrop = document.querySelector('.modal-backdrop');
    modalBackDrop.classList.toggle('visible');
    setTimeout(() => {
      modalBackDrop.classList.toggle('D-Block');
    }, 100);
  }
  static toggelPositionHeaderBottomFix() {
    this.headerBottom = document.querySelector('.header_section_bottom');
    this.headerBottom.classList.toggle('fixeded');
  }
  static hasChild(element = document.documentElement, elementSelector) {
    return element.querySelector(elementSelector) !== null;
  }

  static hasClass(element, className) {
    return element.classList.contains(className);
  }
}
