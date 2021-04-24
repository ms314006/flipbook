export interface GridInterface {
  x: number;
  y:number;
  color: string;
}

export interface PageInterface {
  pageRowLength: number;
  pageColumnLength: number;
  pageNumber: number;
  page: GridInterface[];

  getPositionColor: (x: number, y: number) => string
  setPositionColor: (x: number, y: number, color: string) => void
}

class Page implements PageInterface {
  pageRowLength: number;

  pageColumnLength: number;

  pageNumber: number;

  page: GridInterface[];

  constructor({ page, pageNumber }) {
    this.pageRowLength = 16;
    this.pageColumnLength = 16;
    this.pageNumber = pageNumber;
    this.page = page || (Array.from(Array(this.pageColumnLength * this.pageRowLength)).map(
      (item, positionIndex) => ({
        x: positionIndex % this.pageColumnLength,
        y: Math.floor(positionIndex / this.pageRowLength),
        color: 'transparent',
      }),
    ));
  }

  getPositionColor(x: number, y: number) {
    const page = this.page.find(grid => grid.x === x && grid.y === y);
    if (page !== undefined) return page.color;

    console.error(`isn't exist the page x: ${x}, y: ${y}`);
    return '';
  }

  setPositionColor(x: number, y: number, color: string) {
    this.page = this.page.map((grid) => {
      if (grid.x === x && grid.y === y) {
        return { ...grid, color };
      }
      return { ...grid };
    });
  }
}

export default Page;
