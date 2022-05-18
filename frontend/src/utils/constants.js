import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';

export var user_id = cookie.load ('user')
  ? jwt_decode (cookie.load ('user')).user
  : '';
export var isAdmin = cookie.load ('isAdmin') ? cookie.load ('isAdmin') : false;
export var user = {
  fullName: cookie.load ('fullName'),
  profileImg: JSON.parse (localStorage.getItem ('profileImg')),
};
export const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
export const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;

export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 55;

export const BACKEND_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}`;
// export const BACKEND_URL = `http://localhost:3001`;
const log = console.log.bind (console, 'App:');

// export function encode_token(key){
//     var sign = require('jwt-encode');
//     const data = {
//     };
//     return sign(data,key);
// }

export default log;
