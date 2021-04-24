import defaultFlipbook from '../json/defaultFlipbook.json';
import Page, { PageInterface } from './Page.ts';

export interface FlipbookInterface {
  pages: PageInterface[];
  copiedPage: PageInterface;

  getPage: (pageNumber: number) => PageInterface;
  getPageCount: () => number;
  addNewPage: (pageNumber: number) => PageInterface;
  deletePage: (pageNumber: number) => void;
  copyPage: (pageNumber: number) => void;
  pastePage: (pageNumber: number) => void;
}

class Flipbook implements FlipbookInterface {
  pages: PageInterface[];

  copiedPage: PageInterface;

  constructor(pages: PageInterface[]) {
    this.pages = (pages || defaultFlipbook).map(
      (page, index) => new Page({ page, pageNumber: index }),
    );
    this.copiedPage = null;
  }

  getPage(pageNumber: number) {
    return this.pages[pageNumber || 0];
  }

  getPageCount() {
    return this.pages.length;
  }

  addNewPage(pageNumber: number) {
    this.pages.splice(
      pageNumber + 1, 0,
      new Page({ pageNumber: this.pages.length }),
    );
    this.pages = this.pages.map(
      ({ page }, index) => new Page({ page, pageNumber: index }),
    );
  }

  deletePage(pageNumber: number) {
    this.pages = this.pages.filter(
      page => page.pageNumber !== pageNumber,
    );
    this.pages = this.pages.map(
      ({ page }, index) => new Page({ page, pageNumber: index }),
    );
  }

  copyPage(pageNumber: number) {
    this.copiedPage = new Page(this.getPage(pageNumber));
  }

  pastePage(pageNumber: number) {
    if (!this.copiedPage) return;
    this.pages = this.pages.map((page, index) => {
      if (page.pageNumber !== pageNumber) return page;
      return new Page({ page: this.copiedPage.page, pageNumber: index });
    });
  }
}

export default Flipbook;
