import defaultFlipbook from '../json/defaultFlipbook.json';
import Page from './Page.ts';

class Flipbook {
  constructor(pages) {
    this.pages = (pages || defaultFlipbook).map(
      (page, index) => new Page({ page, pageNumber: index }),
    );
    this.copiedPage = null;
  }

  getPage(pageNumber) {
    return this.pages[pageNumber || 0];
  }

  getPageCount() {
    return this.pages.length;
  }

  addNewPage(pageNumber) {
    this.pages.splice(
      pageNumber + 1, 0,
      new Page({ pageNumber: this.pages.length }),
    );
    this.pages = this.pages.map(
      ({ page }, index) => new Page({ page, pageNumber: index }),
    );
  }

  deletePage(pageNumber) {
    this.pages = this.pages.filter(
      page => page.pageNumber !== pageNumber,
    );
    this.pages = this.pages.map(
      ({ page }, index) => new Page({ page, pageNumber: index }),
    );
  }

  copyPage(pageNumber) {
    this.copiedPage = new Page(this.getPage(pageNumber));
  }

  pastePage(pageNumber) {
    if (!this.copiedPage) return;
    this.pages = this.pages.map((page, index) => {
      if (page.pageNumber !== pageNumber) return page;
      return new Page({ page: this.copiedPage.page, pageNumber: index });
    });
  }
}

export default Flipbook;
