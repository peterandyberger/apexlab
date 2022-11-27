import axios from 'axios';

export default axios.create({
  baseURL: 'http://www.omdbapi.com/?apikey=a303518a',
  headers: {
    'Content-Type': 'application/json',
  },
});
