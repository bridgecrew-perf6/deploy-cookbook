import React from "react";
import { BACKEND_URL } from "../utils/constants";
// import { Link } from "react-router-dom";
import DEFAULT_IMAGE from "../images/default_img.png";
import EllipsisText from "react-ellipsis-text";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  render()
{ 
  const Recipe = (recipe) => {
      return (
        <div >
        <br />
        {cookie.load('logout') === "True" ?
        <div className="text-red-700 alert alert-danger" role="alert" >
        
        <center>
            You successfully logged out.
        </center>
        <br />  
      </div>
      : ""  }
        {cookie.load('logout') === "True" ? cookie.remove('logout') : "" }
        <div className="flex flex-row mx-10" key={recipe.id}>
          <Link to={`view/recipes/${recipe.id}`}>
            <img src={recipe.image} alt={recipe.name} className="w-52 h-52" />
          </Link>
          <div className="flex flex-col mt-8">
            <Link to={`view/recipes/${recipe.id}`}>
              <p style={{ fontFamily: "lobster" }} className="text-3xl">
                {recipe.name}
              </p>
              <p className="mt-3">{recipe.number_of_comments} comments</p>
            </Link>
            <div className="flex mt-4">
              {recipe.ingredients.map((ingredient) => {
                if (ingredient) {
                  return (
                    <span className="rounded-xl bg-blue-500 p-1 px-4 ml-2" key={ingredient.id}>
                      <Link to={`/ingredients/${ingredient.id}`}>
                        {ingredient.name}
                      </Link>
                    </span>
                  );}
              })}
            </div>
          </div>
        </div>
        </div>
      );
    };
    return (
      <div className="mt-28">
        {this.state.recipes.map((recipe) => Recipe(recipe))
        }
        
      </div>
    );
  }

  fetchData() {
    fetch(`${BACKEND_URL}/api/homepage_recipes`)
      .then((response) => response.json())
      .then((response) => {
        response.map((recipe) => {
          recipe.image = recipe.image ?? DEFAULT_IMAGE;
        });
        this.setState({ recipes: response });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default Homepage;
