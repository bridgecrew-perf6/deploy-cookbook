import React from "react";
import {BACKEND_URL, user, user_id} from "../../utils/constants";
import AddComment from "../AddComment";
import ViewComments from "../ViewComments";
import DEFAULT_IMAGE from "../../images/default_img.png";
import defaultProfileImg from "../../images/default-profile-img.jpg";

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  onDeleteIngredient(ingredient) {
    if (window.confirm("Are you sure you wish to delete this ingredient from recipe?")) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const url = `${BACKEND_URL}/api/ingredients/${this.state.recipe.id}/${ingredient.id}`;
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          if (response) this.fetchData();
        });
    }
  }

  render() {
    return (
      <div>
        <div>
          <div class="pt-6">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                class="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                <li>
                  <div class="flex items-center">
                    <a href="#" class="mr-2 text-sm font-medium">
                      Men
                    </a>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      class="w-4 h-5 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>

                <li>
                  <div class="flex items-center">
                    <a href="#" class="mr-2 text-sm font-medium">
                      Clothing
                    </a>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      class="w-4 h-5 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>

                <li class="text-sm">
                  <a
                    href="#"
                    aria-current="page"
                    class="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {this.state.recipe.name}
                  </a>
                </li>
              </ol>
            </nav>
            <div class="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
              <div class="lg:col-span-2 lg:pr-8">
                <div class="h-2/6">
                  <img
                    src={this.state.recipe.image}
                    alt="Model wearing plain white basic tee."
                    class="h-96 m-auto"
                  />
                </div>
                <h1 class="text-2xl font-Lobster tracking-tight text-gray-900 sm:text-3xl" style={{display: 'inline-block'}}>
                  {this.state.recipe.name}
                </h1>
                <div class='recipeDetail_recipe-user'>
                  <span>{this.state.recipe.ownerName ?? ''}</span>
                  <img
                      className="w-10 h-10 bg-gray-300 rounded-full"
                      src={this.state.recipe.ownerImage}
                      alt=""
                  />
                </div>

              <div class="mt-4 lg:mt-0 lg:row-span-3">
                <h2 class="font-Lobster tracking-tight">Product information</h2>
              </div>

              <div class="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:pr-8">
                <div>
                  <h3 class="font-Lobster tracking-tight">Description</h3>

                  <div class="space-y-6">
                    <p class="text-base">
                      {this.state.recipe.instruction}
                    </p>
                    <div class="mt-4 flex">
                      {this.state.recipe.ingredients &&
                      this.state.recipe.ingredients.length
                        ? this.state.recipe.ingredients.map((ingredient) => {
                            if (ingredient) {
                              return (
                                <span class="inline-flex items-center px-2.5 py-0.5 mx-1  rounded-md text-sm font-medium bg-blue-100 text-blue-800">
                                  {ingredient}
                                  {user_id != ""?
                                  <a
                                    class="ml-3 cursor-pointer"
                                    onClick={() =>
                                      this.onDeleteIngredient(ingredient)
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      class="h-4 w-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </a>
                                  :""}
                                </span>
                              );
                            }
                          })
                        : ""}
                    </div>
                    <div class="">
                      <ViewComments id={this.props.id} />
                      <AddComment />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }

  fetchData() {
    fetch(`${BACKEND_URL}/api/recipes/${this.props.id}`)
      .then((response) => response.json())
      .then((response) => {
        var result = response ? response[0] : {};
        result.image = result.image ?? DEFAULT_IMAGE;
        result.ownerImage = result.ownerImage ?? defaultProfileImg;
        this.setState({ recipe: result });
      });
  }
}

export default Recipe;
