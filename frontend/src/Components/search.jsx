import React from "react";
import { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { BACKEND_URL } from "../utils/constants";
import { BrowserRouter, Route } from "react-router-dom";
import DEFAULT_IMAGE from "../images/default_img.png";
import EllipsisText from "react-ellipsis-text";
import { Link } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
import { user_id } from "../utils/constants";
import "../index.css";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
    };
  }

  async renderData() {
    const queryParams = new URLSearchParams(window.location.search);
    const getData = queryParams.get("s");
    const API = await axios.get(`${BACKEND_URL}/api/searchrecipe/${getData}`);
    const serverResponse = API.data;
    serverResponse.map((recipe) => {
      recipe.image = recipe.image ?? DEFAULT_IMAGE;
    });
    this.setState({
      recipes: serverResponse,
    });
    console.log(serverResponse);
  }

  componentDidMount() {
    this.renderData();
  }

  render() {
    const Recipe = (recipe) => {
      return (
        <ScrollAnimation animateIn="flipInY" animateOut="flipOutY">
          <div class="group relative mt-5">
            <Link to={`/view/recipes/${recipe.id}`}>
              <div class="w-full min-h-80 p-4 bg-gray-200 shadow-xl rounded-lg overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={recipe.image}
                  class="w-full h-full p-5 mt-2 mb-2 lg:w-full lg:h-full"
                />
              </div>
              <div class="mt-4 text-center">
                <div>
                  <h3 class="font-Lobster tracking-tight text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" class="absolute inset-0"></span>
                      {recipe.name}
                    </a>
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    <EllipsisText text={recipe.instruction} length={"100"} />
                  </p>
                </div>
              </div>
              <div class="mt-4 text-center">
                {recipe.ingredients.map((ingredient) => {
                  if (ingredient && ingredient.id) {
                    return (
                      <span class="inline-flex items-center px-2.5 py-0.5 mx-1 my-2 rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                        {ingredient.name}
                      </span>
                    );
                  }
                })}
              </div>
            </Link>
          </div>
        </ScrollAnimation>
      );
    };
    return (
      <div className="RecipesList">
        <div class="">
          <div class="mt-5 max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
              <h2 class="text-3xl font-Lobster tracking-tight sm:text-4xl">
                Search recipe of{" "}
                {new URLSearchParams(window.location.search).get("s")}
              </h2>
            </div>
            {user_id != "" ? (
              <Link to="/addRecipe">
                <button
                  class="float-right bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  href="#"
                >
                  <svg
                    class="fill-current w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M11,3 L11.4502481,7.5024814 C11.4784917,7.78491722 11.7161555,8 12,8 C12.2838445,8 12.5215083,7.78491722 12.5497519,7.5024814 L13,3 L14,3 L14.4502481,7.5024814 C14.4784917,7.78491722 14.7161555,8 15,8 C15.2838445,8 15.5215083,7.78491722 15.5497519,7.5024814 L16,3 L17,3 L17,7.5 C17,9.43299662 15.4329966,11 13.5,11 C11.5670034,11 10,9.43299662 10,7.5 L10,3 L11,3 Z"
                      fill="#000000"
                    />
                    <path
                      d="M13.5,13 L13.5,13 C14.0610373,13 14.5243493,13.4382868 14.55547,13.9984604 L14.916795,20.5023095 C14.9602658,21.2847837 14.3611851,21.9543445 13.5787108,21.9978153 C13.5524991,21.9992715 13.5262521,22 13.5,22 L13.5,22 C12.7163192,22 12.0810203,21.3647011 12.0810203,20.5810203 C12.0810203,20.5547682 12.0817488,20.5285212 12.083205,20.5023095 L12.44453,13.9984604 C12.4756507,13.4382868 12.9389627,13 13.5,13 Z"
                      fill="#000000"
                      opacity="0.3"
                    />
                    <path
                      d="M21.5,15 L21.5,15 C22.0634495,15 22.5311029,15.4354411 22.571247,15.9974587 L22.8931294,20.503812 C22.9480869,21.2732161 22.3689134,21.9414932 21.5995092,21.9964506 C21.5663922,21.9988161 21.5332014,22 21.5,22 L21.5,22 C20.7286356,22 20.1033212,21.3746856 20.1033212,20.6033212 C20.1033212,20.5701198 20.1045051,20.536929 20.1068706,20.503812 L20.428753,15.9974587 C20.4688971,15.4354411 20.9365505,15 21.5,15 Z"
                      fill="#000000"
                      opacity="0.3"
                    />
                    <path
                      d="M24,3 L24,13 L20,13 L20,7 C20,4.790861 21.790861,3 24,3 Z"
                      fill="#000000"
                      transform="translate(22.000000, 8.000000) scale(-1, 1) translate(-22.000000, -8.000000) "
                    />
                    <path
                      d="M4.5,14 L4.5,14 C5.06209761,14 5.5273156,14.4370496 5.56237829,14.9980526 L5.90643257,20.5029211 C5.95497952,21.2796724 5.3646533,21.9487088 4.58790204,21.9972557 C4.55863704,21.9990848 4.52932209,22 4.5,22 L4.5,22 C3.72173313,22 3.09082317,21.36909 3.09082317,20.5908232 C3.09082317,20.5615011 3.09173837,20.5321861 3.09356743,20.5029211 L3.43762171,14.9980526 C3.4726844,14.4370496 3.93790239,14 4.5,14 Z"
                      fill="#000000"
                      opacity="0.3"
                    />
                    <path
                      d="M4.5,12 C2.56700338,12 1,9.43299662 1,7.5 C1,5.56700338 2.56700338,3 4.5,3 C6.43299662,3 8,5.56700338 8,7.5 C8,9.43299662 6.43299662,12 4.5,12 Z M4.5095372,4.60103244 L4.56069005,9.94758244 C5.61891495,9.8578583 6.45855912,8.97981222 6.47749614,7.8949109 C6.49728809,6.76103086 5.63275447,4.70470991 4.5095372,4.60103244 Z"
                      fill="#000000"
                    />
                  </svg>
                  <span>Add Recipe</span>
                </button>
              </Link>
            ) : (
              ""
            )}

            <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {this.state.recipes.map((recipe) => Recipe(recipe))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Search;
