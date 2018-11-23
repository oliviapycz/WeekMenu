/*eslint-disable*/
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://weekmenu-75.firebaseio.com/',
});

export default instance;
