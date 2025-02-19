export function padArray<T>(arr: T[], item: T, minLength = 12): T[] {
  return arr.concat(Array(Math.max(0, minLength - arr.length)).fill(item))
}
