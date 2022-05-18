import axios from "axios";
import log, { BACKEND_URL } from "../utils/constants";
import cookie from 'react-cookies'

const headers = {
    'Content-Type': 'application/json',
    'x-access-token': cookie.load('user')
}

const updateIngredient = (id, newName) => {
    console.log(headers)
    return axios({
        method: "put",
        url: BACKEND_URL + `/api/ingredient/${id}`,
        data: {name: newName},
        headers: headers
    })

}

const deleteIngredients = (id) => {
    console.log("delete")
    return axios.delete(`${BACKEND_URL}/api/ingredients/${id}`)
  }


export default {
    updateIngredient,
    deleteIngredients,
};