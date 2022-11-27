import { ADD_MOVIES, ADD_SEARCH, ADD_WIKIPEDIA, ADD_IMDB } from './actions';

const initialState = {
  movieData: [],
  search: '',
  wikiData: [],
  imdbData: [],
};

function apexlabstore(state = initialState, action) {
  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        movieData: action.data,
      };
    case ADD_SEARCH:
      return {
        ...state,
        search: action.data,
      };
    case ADD_WIKIPEDIA:
      return {
        ...state,
        wikiData: action.data,
      };
    case ADD_IMDB:
      return {
        ...state,
        imdbData: action.data,
      };

    default:
      return state;
  }
}

export default apexlabstore;
