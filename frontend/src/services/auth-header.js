import cookie from 'react-cookies'

export default function authHeader() {
    const user = cookie.load('user');
    console.log(user);
    if (user) {
        return { 'x-access-token': user };
    } else {
      console.log("Failed");
      return {
        'x-access-token': ""
      };
    }
  }