export const ADD_MOVIES = "ADD_MOVIES";

export function addMovies(data) {
  return { type: ADD_MOVIES, data: data };
}
