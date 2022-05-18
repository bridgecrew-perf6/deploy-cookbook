import React, { useState } from "react";
import Logo from "../images/logo.png";
import classNames from "classnames";
import log, { user_id, user } from "../utils/constants";
import DEFAULT_IMAGE from "../images/default_img.png";
import cookie from "react-cookies";
import defaultProfileImg from "./../images/default-profile-img.jpg";
import { Link } from "react-router-dom";

var isVisible = false;
const Header = (props) => {
  const logout = () => {
    cookie.remove("user");
    cookie.remove("fullName");
    cookie.remove("isAdmin");
    cookie.save("logout","True")
    localStorage.removeItem("profileImg");
  };

  const dropdown = () => {
    if (isVisible) {
      document.getElementById("drop-down-img").src =
          "https://img.icons8.com/ios-glyphs/30/000000/arrow.png";
      document.getElementById("drop-down-container").classList.add("hidden");
      isVisible = false;
    } else {
      document.getElementById("drop-down-img").src =
          "https://img.icons8.com/ios-glyphs/30/000000/down-squared.png";
      document.getElementById("drop-down-container").classList.remove("hidden");
      isVisible = true;
    }
  };

  const dropdownMenu = () => {
    document.getElementById("nav-content").classList.toggle("hidden");
    document.getElementById("theme-mode-menu").classList.toggle("hidden");
    document.getElementById("change-language-menu").classList.toggle("hidden");
  };

  return (
      <div
          className={classNames(
              "flex m-0 p-0",
              "fixed",
              "z-10",
              "w-screen",
              "py-2",
              `bg-gradient-to-r from-${props.bgcolor}-300 via-${props.bgcolor}-500 to-${props.bgcolor}-700`
          )}
      >
        <div className="flex flex-col h-full w-full">
          <div
              className="lg:flex mr-12 ml-auto w-40 space-x-6 -mt-3 cursor-pointer lg:block hidden"
              onClick={props.themeCallBack}
          >
            <h2 className="mt-3 fond-QuickSand -mr-4 text-sm ">{props.mode}</h2>

            <img className="w-7 h-7 p-1 mt-2" src={props.icon} alt="" />
          </div>

          <div
              className="lg:flex mr-12 ml-auto w-40 space-x-6 -mt-3 cursor-pointer lg:block hidden"
              onClick={props.changeLanguage}
          >
            <h2 className="mt-1 fond-QuickSand -mr-4 text-sm">
              {props.data.LanguageToConvert}
            </h2>
          </div>

          {log(props.user)}
          <nav className="flex items-center justify-between flex-wrap w-full mt-auto px-10">
            <div className="flex ml-5 -mt-3">
              <img className="w-20 h-20 p-4" alt="" src={Logo}></img>
              <h2 className="font-Lobster font-normal tracking-tight -ml-3 text-4xl mt-6 mb-auto">
              <Link to="/recipes">{props.data.Recipes}</Link>
              </h2>
            </div>
            <div className="block lg:hidden">
              <button
                  id="nav-toggle"
                  className="flex items-center px-3 py-2 border rounded text-black-500 border-black hover:text-white hover:border-white"
                  onClick={dropdownMenu}
              >
                <svg
                    className="fill-current h-3 w-3"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
            <div
                className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0"
                id="nav-content"
            >
              <ul className="list-reset lg:flex justify-end flex-1 items-center">
                <li className="font-QuickSand font-semibold text-medium mr-3">
                  <Link to="/recipes">{props.data.Recipes}</Link>
                </li>
                <li className="font-QuickSand font-semibold text-medium mr-3">
                  <Link to="/ingredients">{props.data.Ingredients}</Link>
                </li>
                <li class="font-QuickSand font-semibold text-medium mr-3">
                  <a href="/about">{props.data.About}</a>
                </li>
                <li class="font-QuickSand font-semibold text-medium mr-3">
                  <a href="/privacyPolicy">{props.data.Privacy_policy}</a>
                </li>
                {cookie.load("user") ? (
                    ""
                ) : (
                    <li className="font-QuickSand font-semibold text-medium mr-3">
                      <Link to="/login"> {props.data.Login} </Link>
                    </li>
                )}
                {cookie.load("user") ? (
                    ""
                ) : (
                    <li className="font-QuickSand font-semibold text-medium mr-3">
                      <Link to="/register"> {props.data.Signup} </Link>
                    </li>
                )}
                <form action="/search" method="get">
                  <input
                      type="text"
                      className="header-search"
                      placeholder={props.data.Search_Recipe}
                      name="s"
                  />

                  <button type="submit" className="SearchButton">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-search"
                        viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                </form>{" "}
                {cookie.load("user") ? (
                    <li className="flex font-QuickSand font-bold text-medium">
                      <span>{user.fullName ? user.fullName : ""}</span>
                      <img
                          class="w-10 h-10 bg-gray-300 rounded-full"
                          src={
                            user.profileImg == null
                                ? defaultProfileImg
                                : "data:image/png;base64," + user.profileImg
                          }
                          alt=""
                      />
                      <div>
                        <img
                            id="drop-down-img"
                            onClick={dropdown}
                            className="cursor-pointer"
                            src="https://img.icons8.com/ios-glyphs/30/000000/arrow.png"
                            alt="404"
                        />
                        <div
                            id="drop-down-container"
                            className={classNames(
                                "absolute",
                                "hidden",
                                `bg-gradient-to-r from-${props.bgcolor}-700 via-${props.bgcolor}-700 to-${props.bgcolor}-700`,
                                "mt-8",
                                "p-4"
                            )}
                        >
                          <ul>
                            <li className="font-QuickSand font-semibold text-medium">
                              <Link to={`/recipes?id=${user_id}`}>
                                {" "}
                                {props.data.My_Recipes}{" "}
                              </Link>
                            </li>
                            <li className="font-QuickSand font-semibold text-medium">
                              <Link to="/" onClick={logout}>
                                {" "}
                                {props.data.Logout}{" "}
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                ) : (
                    ""
                )}
                <li className="font-QuickSand font-semibold text-medium mr-3">
                  <div
                      className="flex mr-12 ml-auto space-x-6 -mt-3 cursor-pointer hidden"
                      id="theme-mode-menu"
                      onClick={props.themeCallBack}
                  >
                    <h2 className="mt-3  font-Lobster tracking-tight -mr-4 text-sm ">
                      {props.mode}
                    </h2>
                    <img
                        className="w-7 h-7 p-1 mt-2"
                        src={props.icon}
                        alt=""
                    ></img>
                  </div>
                </li>
                <li className="font-QuickSand font-semibold text-medium mr-3">
                  <div
                      className="flex mr-12 ml-auto space-x-6 -mt-3 cursor-pointer hidden"
                      id="change-language-menu"
                      onClick={props.changeLanguage}
                  >
                    <h2 className="mt-1  font-Lobster tracking-tight -mr-4 text-sm">
                      {props.data.LanguageToConvert}
                    </h2>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
  );
};

export default Header;