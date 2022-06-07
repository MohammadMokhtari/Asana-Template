import { DomHelper } from '../dom/DomHelper';
import SelectorEngine from '../dom/selectorEngine.js';

export class Search {
  constructor() {
    this.init();
  }
  init() {
    this.searchEl = SelectorEngine.findOne('.search');
    this.inputeSearchHover();
  }

  inputeSearchHover() {
    const inputSearch = SelectorEngine.findOne(
      '#Search_site_input',
      this.searchEl
    );
    inputSearch.addEventListener('focus', () => {
      // this.showRecentKeySearch();
      DomHelper.showBackDrop();
    });
    inputSearch.addEventListener('blur', () => {
      // this.hideSearchRecentKey();
      DomHelper.hideBackDrop();
    });
  }
  // async showRecentKeySearch() {
  //   this.recentSearchElement = SelectorEngine.findOne(
  //     '.search_resulte',
  //     this.searchEl
  //   );
  //   this.recentSearchElement.classList.add('visible');
  //   if (!this.recentSearchElement.dataset.keysData) {
  //     const response = await Axios.sendGetRequest(
  //       'https://jsonplaceholder.typicode.com/posts'
  //     );

  //     const searchRecentKeyEl = SelectorEngine.findOne(
  //       '.search_resulte_recent_key',
  //       this.recentSearchElement
  //     );

  //     const searchRecentKeyTemplate = SelectorEngine.findOne(
  //       '#sreach-recent-key',
  //       this.recentSearchElement
  //     );

  //     response.data.forEach((p) => {
  //       const searchRecentKeyEls = document.importNode(
  //         searchRecentKeyTemplate.content,
  //         true
  //       );
  //       searchRecentKeyEls.querySelector('a').textContent = p.title;
  //       searchRecentKeyEl.lastElementChild.append(searchRecentKeyEls);
  //     });
  //   }
  //   this.recentSearchElement.dataset.keysData = true;
  // }
  // hideSearchRecentKey() {
  //   this.recentSearchElement.classList.remove('visible');
  // }
}
