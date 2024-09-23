
export const isNullish = (val: unknown) => val == null;

/**
 * Return an integer in [min, max). If only one argument is given, the argument
 * will be regarded as maximum and minimum is 0.
 */
export function randint(min: number, max: number): number
/**
 * Return an integer in [0, max).
 */
export function randint(max: number): number
export function randint(min: number, max?: number) {
  if (isNullish(max)) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Return one of Latin alphabets and Arabic numbers.
 */
export const randomLetter = () =>
  'abcdefghijklmnopqrstuvwxyz0123456789'
    .charAt(randint(36)); // 36 letters, 0~35

/**
 * Generate a random length string
 */
export const genString = (maxLen: number = 10) => {
  const len = randint(1, maxLen + 1);
  let str = '';
  for (let i = 0; i < len; i++) {
    str += randomLetter();
  }
  return str;
};

/**
 * Generate a random key. If `keys` is specified, than generate a unique key
 * that is not in `keys`.
 */
export const genUniqueKey = (keys?: string[]) => {
  let key = randomLetter();
  if (isNullish(keys)) return key;
  while (keys.includes(key)) {
    key += randomLetter();
  }
  return key;
};

/**
 * Capitalize (title case) a string.
 */
export const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    text => text[0].toUpperCase() + text.slice(1).toLowerCase()
  );
};
