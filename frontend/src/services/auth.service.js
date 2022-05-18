import axios from "axios";
import log, { BACKEND_URL } from "../utils/constants";
import cookie from 'react-cookies'


const headers = {
  'Content-Type': 'application/json',
  'x-access-token': cookie.load('user')
}

const register = (email, password, name, picture, type) => {
  var user = new FormData();
  user.append("uname", email);
  user.append("password", password)
  user.append("name", name)
  user.append("type", type)
  if(picture){
    user.append("image", picture, picture.name)
  }
  log(BACKEND_URL + "/api/auth/register")
  return axios({
    method: "post",
    url: BACKEND_URL + "/api/auth/register",
    data: user,
    mode: 'cors',
    headers: {
      'Content-Type': "multipart/form-data",
      'Access-Control-Allow-Origin': true
    }
  })
};

const addrecipe = (reciepename, instruction, owner_id, selectedIngredients, imageFile) => {
  // console.log(cookie.load('user'));
  var user = new FormData();
  user.append("name", reciepename);
  user.append("instruction", instruction)
  user.append("owner_id", owner_id)
  user.append("ingredients", selectedIngredients.join(','))
  if(imageFile)
    user.append("image", imageFile, imageFile.name)
  log(BACKEND_URL + "/api/add-recipe")
  return axios({
    method: "post",
    url: BACKEND_URL + "/api/add-recipe",
    data: user,
    mode: 'cors',
    headers: {
      'Content-Type': "multipart/form-data",
      'Access-Control-Allow-Origin': true,
      'x-access-token': cookie.load('user')
    }
  })
};


const allingredients = () => {
  return fetch(`${BACKEND_URL}/api/ingredients`)
}

const recipes = () => {
  return axios.get(`${BACKEND_URL}/api/homepage_recipes`)
}

const userrecipes = (id) => {
  return axios.get(`${BACKEND_URL}/api/recipes?id=${id}`)
}

const login = (email, password) => {
  var user = new FormData();
  user.append("email", email);
  user.append("password", password)

  return axios({
    method: "post",
    url: BACKEND_URL + "/api/auth/login",
    data: user,
    "Content-Type": "multipart/form-data",
  })
};

const logout = () => {
  cookie.remove('user')
};

const getCurrentUser = () => {
  return JSON.parse(cookie.load("user"));
};

export default {
  register,
  allingredients,
  recipes,
  userrecipes,
  login,
  logout,
  getCurrentUser,
  addrecipe,
};