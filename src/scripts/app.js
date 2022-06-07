import { SiteMenu } from './app/siteMenu.js';
import { Search } from './app/search.js';
import { Header } from './app/header.js';
import { ShoppingCart } from './app/shoppingCart.js';
import { Collaps } from './App/Collapse.js';
import Aside from './app/aside';
import form from './app/forms';
import dropdown from './app/dropdown';
import Modal from './app/modals.js';
import './app/swiper';

import '../sass/style.scss';

class App {
  static init() {
    new SiteMenu();
    new Search();
    new Header();
    new ShoppingCart();
    new Collaps();
    form.initForms();
    Modal.initModal();
    dropdown.initDropdown();
    Aside.initAside();
  }
}
App.init();
