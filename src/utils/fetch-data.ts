import {genString, isNullish, randint, toTitleCase} from './helpers';



const fetchData = (
  link: string,
  // eslint-disable-next-line
  callback: ((json: any) => string)
): Promise<string | null> => {
  return fetch(link)
    .then(res => {
      if (res.ok) return res.json();
      throw new Error(`${res.status}`);
    })
    .then(callback)
    .catch(function () {
      return null;
    });
};

/**
 * Fetch Chuck Norris Joke from https://api.chucknorris.io/
 */
export const getChuckNorrisJokes = (): Promise<string | null> => {
  return fetchData(
    'https://api.chucknorris.io/jokes/random',
    json => json.value as string
  );
};

/**
 * Fetch useless facts from https://uselessfacts.jsph.pl/
 */
export const getUselessFacts = (): Promise<string | null> => {
  return fetchData(
    'https://uselessfacts.jsph.pl/api/v2/facts/random',
    json => json.text as string
  );
};

export type TextSource = 'norris' | 'facts' | null;
export const textSourceMap: {
  [key in NonNullable<TextSource>]: string
} = {
  'norris': 'https://api.chucknorris.io/',
  'facts': 'https://uselessfacts.jsph.pl/',
} as const;

export const getText = async () => {
  const prob = Math.random();
  let data: [string | null, TextSource] | null = null;
  if (prob <= 0.5)
    data = [await getChuckNorrisJokes(), 'norris'];
  else
    data = [await getUselessFacts(), 'facts'];
  if (isNullish(data![0])) data = ['No data available', null];
  return data as [string, TextSource];
};

/**
 * Return a avatar from robohash.org
 */
export const getAvatar = (size: number = 150) => {
  const key = genString(20);
  const set = ['set1', 'set2', 'set3', 'set4', 'set5', 'any'][randint(6)];
  return `https://robohash.org/${key}?set=${set}&size=${size}x${size}`;
};

/** Get 2 random word from random-word-api as a name. */
export const getUserName = () => {
  return fetchData(
    'https://random-word-api.herokuapp.com/word?number=2',
    json => toTitleCase((json as [string, string]).join(' '))
  );
};

/** Get a joke from isEven API as adverts */
export const getIsEvenAD = () => {
  return fetchData(
    'https://api.isevenapi.xyz/api/iseven/0/',
    (json) => json.ad
  );
};
