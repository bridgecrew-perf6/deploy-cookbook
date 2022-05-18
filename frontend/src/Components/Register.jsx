import { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import log, { PASSWORD_MAX, PASSWORD_MIN } from "../utils/constants";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { isAlphanumeric } from "validator";
import AuthService from "../services/auth.service";
import validator from "validator";
var backend_host = process.env.REACT_APP_BACKEND_HOST;
var backend_port = process.env.REACT_APP_BACKEND_PORT;

const required = (value) => {
  if (!value) {
    return (
      <div className="text-red-700" role="alert">

        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="text-red-700" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const imageValue = (value) => {
  if (value == null) {
    return (
      <div className="text-red-700" role="alert">
        Please upload image.
      </div>
    );
  }
};
const vpassword = (value) => {
  if (
    (value.length < PASSWORD_MIN && value.length > 0) ||
    value.length > PASSWORD_MAX
  ) {
    return (
      <div className="text-red-700 alert alert-danger" role="alert">
        The password must be between 8 to 55.
      </div>
    );
  }
};

function Register(props) {
  const history = useHistory();
  const doRegistration = () => {
    log("Do Register!");
    console.log(vpassword);
    if (!vpassword(password) && !email(username)) {
      if (
        ((password === cpassword && password) || cpassword !== "") &&
        imageFile != null
      ) {
        AuthService.register(username, password, name, imageFile, "Regular")
          .then(function (response) {
            //handle success
            log(response);
            if (response.data == "Registered") {
              alert("Registered!");
              history.push("/");
            }
          })
          .catch((error) => {
            //console.log(error);
            log(error + "");
          });
      }
    }
  };

  const matchPassword = (value) => {
    if (value.length > 0) {
      if (password !== cpassword) {
        return (
          <div className="text-amber-700" role="alert">
            This Confirm password should be same as password.
          </div>
        );
      }
    }
  };

  require("typeface-quicksand");
  //const [fullname, setfullname] = useState ('');
  const [username, setusername] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  return (
    <div className={"mt-32"}>
      <div
        class={`bg-gradient-to-r from-${props.bgcolor}-300 via-${props.bgcolor}-500 to-${props.bgcolor}-700 shadow-lg ml-40 mr-40 rounded-md mt-10 px-8 pt-6 pb-8 mb-4 `}
      >
        <div class="mb-4">
          <label
            class="block text-left text-sm font-bold mb-2"
            for="name"
          >
            {props.data.Register_Page_Name}
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              setname(e.target.value);
            }}
            id="name"
            type="text"
            placeholder=  {props.data.Full_Name}
            value={name}
          />
          {required(name)}
        </div>
        <div class="mb-4">
          <label
            class="block text-left text-sm font-bold mb-2"
            for="username"
          >
            {props.data.Register_Page_Email}
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              setusername(e.target.value);
            }}
            id="username"
            type="text"
            placeholder={props.data.Login_Page_Email}
            value={username}
          />
          {/* {(() =>{if (condition) {
            
          } else {
            
          }} */}
          {email (username)}
        </div>
        <div class="mb-6">
          <label
            class="block text-left text-sm font-bold mb-2"
            for="password"
          >
            {props.data.Register_Page_Password}
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            id="password"
            type="password"
            placeholder="******************"
            value={password}
          />
          {vpassword(password)}
          {required(password)}
        </div>
        <div class="mb-6">
          <label
            class="block text-left text-sm font-bold mb-2"
            for="cpassword"
          >
            {props.data.Register_Page_ConfirmPassword}
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              setcpassword(e.target.value);
            }}
            id="cpassword"
            type="password"
            placeholder=  {props.data.Register_Page_ConfirmPassword}
          />
          {required(cpassword)}
          {matchPassword(cpassword)}
        </div>
        <div class="mb-6">
          <label
            class="block 
        text-left 
      text-gray-700 
        text-sm 
        font-bold 
        mb-2"
            for="avtar"
          >
            Enter User Image
          </label>
          <input
            class="shadow 
        appearance-none 
        border 
        rounded 
        w-full 
        py-2 
        px-3 
        text-gray-700 
        leading-tight 
        focus:outline-none 
        focus:shadow-outline"
            id="avtar"
            type="file"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
            }}
            accept="image/png, image/jpeg, image/jpg"
          />
          {imageValue(imageFile)}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 px-4 rounded-lg py-4 hover:bg-green-700 font-bold text-white"
            onClick={doRegistration}
          >
            {props.data.Login_Page_Register}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Register;
