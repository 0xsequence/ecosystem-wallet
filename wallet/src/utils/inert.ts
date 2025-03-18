export function inert(condition?: boolean) {
  return {
    // 'data-inert': condition ? 'true' : undefined,
    inert: condition ? 'inert' : undefined
  }
}
