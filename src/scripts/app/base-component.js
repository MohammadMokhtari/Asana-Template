import Data from './date';

export class AsBaseComponent {
  constructor(element) {
    if (element === undefined || element === null) {
      return;
    }

    this._element = element;

    Data.set(this._element, this.constructor.DATA_KEY, this);
  }

  static getInstance(element) {
    return Data.get(element, this.DATA_KEY);
  }

  static get NAME() {
    throw new Error(
      'You have to implement the static method "NAME", for each component!'
    );
  }

  static get DATA_KEY() {
    return `as.${this.NAME}`;
  }
}
