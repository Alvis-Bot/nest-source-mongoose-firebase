export {};

declare global {
  interface Array<T> {
    forAsync<T>(callback: (item: T, index: number, array: T[]) => Promise<void>): Promise<void>;

    mapAsync<T, U>(callback: (item: T, index: number, array: T[]) => Promise<U>): Promise<U[]>;
  }
}
Array.prototype.forAsync = async function <T>(
  callback: (item: T, index: number, array: T[]) => Promise<void>
): Promise<void> {
  for (let i = 0; i < this.length; i++) {
    await callback(this[i], i, this);
  }
};

Array.prototype.mapAsync = async function <T, U>(
  callback: (item: T, index: number, array: T[]) => Promise<U>
): Promise<U[]> {
  const results: U[] = [];
  for (let i = 0; i < this.length; i++) {
    const result = await callback(this[i], i, this);
    results.push(result);
  }
  return results;
};
