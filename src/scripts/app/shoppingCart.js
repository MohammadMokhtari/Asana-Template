import { DomHelper } from '../dom/DomHelper';
import SelectorEngine from '../dom/selectorEngine';

const SHOPPING_BTN_CLASSNAME = '.shopin_cart_btn';
const SHOPPING_DIV_CLASSNAME = '.navbar__soppingbag__container';

export class ShoppingCart {
  constructor() {
    this.shopingCartButtonAction();
  }
  shopingCartButtonAction() {
    const shoppingCartBtnElement = SelectorEngine.findOne(
      SHOPPING_BTN_CLASSNAME
    );
    const ShoppingCartDivIdElement = SelectorEngine.findOne(
      SHOPPING_DIV_CLASSNAME
    );
    shoppingCartBtnElement.addEventListener('mouseenter', () => {
      DomHelper.fadeInElement(ShoppingCartDivIdElement);
    });
    shoppingCartBtnElement.addEventListener('mouseleave', () => {
      DomHelper.fadeOutElement(ShoppingCartDivIdElement);
    });
  }
  fetchShoppingCartItemData() {
    /**
     * TODO Get data From server
     */
  }
}
