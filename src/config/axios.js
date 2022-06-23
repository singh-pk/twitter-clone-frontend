import axios from 'axios';

export default axios.create({
  baseURL: 'https://tweaker-twitter.herokuapp.com/api'
});
