

export function white(char: string) {
  return `\x1b[0m${char}\x1b[0m`; 
}

export function red(char: string) {
  return `\x1b[31m${char}\x1b[0m`;
}

export function blue(char: string) {
  return `\x1b[34m${char}\x1b[0m`
}

export function green(char: string) {
  return `\x1b[32m${char}\x1b[0m`
}

export function purple(char: string) {
  return `\x1b[35m${char}\x1b[0m`
}

export function navy(char: string) {
  return `\x1b[36m${char}\x1b[0m`
}


export enum Color {
  Red = "#e53935",
  Purple = "#8E24AA",
  Blue = "#039BE5",
  Green = "#00897B",
  Navy = "#3949AB"
}

export function color(color: Color, char: string) {
  if (color === Color.Red) return red(char);
  if (color === Color.Blue) return blue(char); 
  if (color === Color.Green) return green(char);
  if (color === Color.Purple) return purple(char);
  if (color === Color.Navy) return navy(char);
  throw new Error("Unknown color");
}
