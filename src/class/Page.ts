class Page {
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
    return this.page.find(grid => grid.x === x && grid.y === y).color;
  }

  setPositionColor(x, y, color) {
    this.page = this.page.map((grid) => {
      if (grid.x === x && grid.y === y) {
        return { ...grid, color };
      }
      return { ...grid };
    });
  }
}

export default Page;
