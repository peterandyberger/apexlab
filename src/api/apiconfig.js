import axios from "axios";

export default axios.create({
  baseURL: "https://tmdb.sandbox.zoosh.ie/dev/graphql",
  headers: {
    "Content-Type": "application/json",
  },
});
