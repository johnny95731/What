import {genString, isNullish, randint, toTitleCase} from './helpers';



const fetchData = (
  link: string,
  // eslint-disable-next-line
  callback: ((json: any) => string),
  init?: RequestInit
): Promise<string | null> => {
  return fetch(link, init)
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
 * Fetch joke from https://github.com/15Dkatz/official_joke_api
 */
export const getOfficialJoke = (): Promise<string | null> => {
  return fetchData(
    'https://official-joke-api.appspot.com/random_joke',
    json => json.setup + '\n' + json.punchline
  );
};

/**
 * Fetch a joke from https://jokeapi.dev
 */
export const getJoke = (): Promise<string | null> => {
  return fetchData(
    'https://v2.jokeapi.dev/joke/Miscellaneous,Pun,Spooky,Christmas',
    json => {
      if (json.type === 'single') {
        return json.joke as string;
      }
      return json.setup + '\n' + json.delivery;
    }
  );
};

/**
 * Fetch a advice from https://api.adviceslip.com/
 */
export const getAdviceSlip = (): Promise<string | null> => {
  return fetchData(
    'https://api.adviceslip.com/advice',
    json => json.slip.advice
  );
};

export type TextSource = 'norris' | 'officialJoke' | 'joke' | 'advice' | null;
export const textSourceMap: {
  [key in NonNullable<TextSource>]: string
} = {
  norris: 'https://api.chucknorris.io/',
  officialJoke: 'https://github.com/15Dkatz/official_joke_api',
  joke: 'https://jokeapi.dev/#try-it',
  advice: 'https://api.adviceslip.com/'
} as const;

export const getText = async () => {
  const prob = randint(4);
  let data: [string | null, TextSource] = [null, null];
  if (prob === 0)
    data = [await getOfficialJoke(), 'officialJoke'];
  else if (prob === 1)
    data = [await getJoke(), 'joke'];
  else if (prob === 2)
    data = [await getAdviceSlip(), 'advice'];
  else
    data = [await getChuckNorrisJokes(), 'norris'];
  if (isNullish(data[0])) data[0] = 'No data available';
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
