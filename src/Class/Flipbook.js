import defaultFlipbook from '../json/defaultFlipbook.json';
import Page from './Page';

class Flipbook {
  constructor(pages) {
    this.pages = (pages || defaultFlipbook).map(page => new Page(page));
    this.currentPage = 0;
  }

  getPage(pageNumber) {
    return this.pages[pageNumber || this.currentPage];
  }
}

export default Flipbook;
