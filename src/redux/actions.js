export const ADD_MOVIES = 'ADD_MOVIES';
export const ADD_SEARCH = 'ADD_SEARCH';
export const ADD_WIKIPEDIA = 'ADD_WIKIPEDIA';
export const ADD_IMDB = 'ADD_IMDB';

export function addMovies(data) {
  return { type: ADD_MOVIES, data: data };
}

export function addSearch(data) {
  return { type: ADD_SEARCH, data: data };
}

export function addWiki(data) {
  return { type: ADD_WIKIPEDIA, data: data };
}

export function addImdb(data) {
  return { type: ADD_IMDB, data: data };
}
