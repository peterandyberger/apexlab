import { ADD_MOVIES } from "./actions";

const initialState = {
  movieData: [],
};

function apexlabstore(state = initialState, action) {
  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        movieData: action.data,
      };

    default:
      return state;
  }
}

export default apexlabstore;
