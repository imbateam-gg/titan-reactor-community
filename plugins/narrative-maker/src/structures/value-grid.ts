import { GridValue } from "./grid-values";


export class ValueGrid<T> {
  grid: GridValue<T>[] = [];
  size: number;

  constructor(size: number, Constructor: new (x: number, y:number) => GridValue<T>) {
    this.size = size;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        this.grid.push(new Constructor(x, y));
      }
    }
  }

  getIndex(x: number, y: number) {
    return y * this.size + x;
  }
  
  /**
   * Get the grid value
   */
  get(xy: {x: number, y: number}) {
    const index = this.getIndex(xy.x, xy.y);
    return this.grid[index].value;
  }

  /**
   * Get the grid item
   */
  $get(xy: {x: number, y: number}) {
    const index = this.getIndex(xy.x, xy.y);
    return this.grid[index];
  }

  set(xy: {x: number, y: number}, value: T) {
    const index = this.getIndex(xy.x, xy.y);
    this.grid[index].value = value;
  }
  
  clear() {
    for (const quadrant of this.grid) {
      quadrant.clear();
    }
  }

  getNearbyList(arr: T[], xy: {x: number, y: number}, radius = 0) {
    arr.length = 0;
    for (const item of this.getNearby(xy, radius)) {
      arr.push(item.value);
    }
    return arr;
  }


  *getNearby(xy: {x: number, y: number}, radius = 0) {

    const minX = Math.floor(Math.max(0, xy.x - radius));
    const minY = Math.floor(Math.max(0, xy.y - radius));
    const maxX = Math.floor(Math.min(this.size - 1, xy.x + radius));
    const maxY = Math.floor(Math.min(this.size - 1, xy.y + radius));

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const index = this.getIndex(x, y);
        yield this.grid[index];
      }
    }
  }
}