import axios from "axios"
import classNames from "classnames";
import {Link, Redirect} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import cookie from 'react-cookies'
import log from "../utils/constants";
import AuthService from "../services/auth.service";
import jwt_decode from "jwt-decode";


function Login(props) {
    const user = cookie.load('user');
    const history = useHistory();
    var email = ""
    var password = ""

    const doLogin = () => {
        var user = new FormData();
        user.append("email", email);
        user.append("password", password)
        if (email && password !== "") {
            AuthService.login(email, password).then( (response) => {
                console.log(response.data);
                if (response.data !== 'User Not Exist') {
                    if (response.data) {
                        cookie.save('user', JSON.stringify( response.data.token ))
                        if(response.data.type === 'ADMIN'){
                            cookie.save('isAdmin', true)
                          }else{
                            cookie.save('isAdmin', false)
                          }
                          const isAdmin = cookie.load('isAdmin');
                        cookie.save('fullName', response.data.fullName)
                        localStorage.setItem('profileImg', JSON.stringify(response.data.profileImg))
                        props.refreshCallback()
                        window.location.reload(false)

                    } else if (response.data === 'User Not Exist') {
                        alert('User Does Not Exist!')
                    }

                } else {
                    alert("Login Failed!")
                }
                return response.data;
            });
        } else {
            alert("Please Enter A Valid Email/Password!")
        }
    }

    return(
        <div className="flex flex-col mt-24 h-screen p-10 py-20">
        <div className={classNames("flex", "flex-col", "login__container", `bg-gradient-to-r from-${props.bgcolor}-300 via-${props.bgcolor}-500 to-${props.bgcolor}-700` , "rounded-2xl")}>
        <label className="
        text-4xl
         text-left
        text-black
        ml-7
        mt-10
        absolute
        font-Lobster
        ">
            {props.data.Login_Page_Header}
                </label>
                <div class="flex flex-row mb-4 w-full h-10 mt-32">

                    <label class="block
        mt-2
        font-QuickSand
        text-left
      text-black
        ml-10
        mr-10
        text-xl
        font-semibold
        mb-2" for="username">
                        {props.data.Login_Page_Email}
                    </label>
                    <input class="shadow
        appearance-none
        font-QuickSand
        rounded
        border
        border-black
        w-full
        mr-20
        py-2
        ml-10
        px-3
        text-black
        leading-tight
        focus:outline-none
        focus:shadow-outline" onChange={e => {
                        email = e.target.value
                    }} type="email" id="username" placeholder={props.data.Login_Page_Email_PlaceHolder}/>
                </div>
                <div class=" flex flex-row w-full  mb-6">
                    <label class="block
        ml-10
        mt-2
        text-left
        text-xl
        text-black
        font-QuickSand
        font-semibold
        mb-2">
                        {props.data.Login_Page_Password}
                    </label>
                    <input class="shadow
        appearance-none
        border
        border-black
        rounded
        ml-10
        w-full
        mr-20
        py-2
        font-QuickSand
        px-3
        text-black
        mb-3
        leading-tight
        focus:outline-none
        focus:shadow-outline" onChange={e => {
                        password = e.target.value
                    }} id="password" type="password" placeholder="°  °  °  °  °  °  °  °  °  °  °  °  °  °  °  °"/>
                </div>
                <div className="flex space-x-3 mr-20">
                    <button className="bg-white
             px-12
             ml-auto
             border
             border-black
              shadow-lg
             font-QuickSand
             rounded-lg
             py-2
             font-bold
           text-black" onClick={doLogin}>
                        {props.data.Login_Page_Sign_in}
                    </button>
                    <Link to="/register">
                        <button className="
             inline-block
             bg-white
             align-baseline
             px-12
             border
             shadow-lg
             border-black
             rounded-lg
             font-bold
             font-QuickSand
             py-2
             text-black" href="#">
                            {props.data.Login_Page_Register}
                        </button>
                    </Link>

                </div>
            </div>

        </div>
    )
}

export default Login
