class Page {
  constructor(page) {
    this.page = page;
    this.pageRowLength = 16;
    this.pageColumnLength = 16;
  }

  getPositionColor(x, y) {
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
