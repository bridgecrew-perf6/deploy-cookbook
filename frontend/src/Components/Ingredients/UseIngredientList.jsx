import React from "react";
import { BACKEND_URL } from "../../utils/constants";
import { Link } from "react-router-dom";
class UseIngredientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredient: {}
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const Recipes = (recipes) => {
            if (!recipes || !recipes.length) {
                return <div className="my-36">
                    <div className="px-10 py-2 flex justify-center">
                        <p>This ingredient is Not Available in any Recipe</p>
                    </div>
                </div>
            } else {
                return <>
                    <h2 class="text-2xl tracking-tight mt-1 px-5 pt-6 pb-6">
                        Recipes that use this ingredient:
                    </h2>
                    <div class="mx-14">
                        {this.state.ingredient.recipes ? this.state.ingredient.recipes.map((recipe) => (
                            <ul class="list-disc">
                                <Link to={`/view/recipes/${recipe.id}`}>
                                    <li className="underline">
                                        {recipe.name}
                                    </li>
                                </Link>
                            </ul>
                        )) : ""}
                    </div>
                </>
            }
        }
        return (
            <div className="RecipesList">
                <div class="">
                    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div class="mt-4 text-center">
                            <div>
                                <h3 class="text-sm text-2xl tracking-tight text-gray-900  mt-1  px-5 pt-6">
                                    <Link to={`/recipes/${this.state.ingredient.id}`}>
                                        <p class="text-2xl font-extrabold tracking-tight text-gray-900 text-left text-gray-500">
                                            {this.state.ingredient.name}
                                        </p>
                                    </Link>
                                </h3>
                            </div>
                        </div>
                        {Recipes(this.state.ingredient.recipes)}
                    </div>

                </div>
            </div>
        );
    }

    fetchData() {
        fetch(`${BACKEND_URL}/api/ingredients/recipes/${this.props.id}`)
            .then((response) => response.json())
            .then((response) => {
                if (response && response.length) {
                    document.title = response[0].name;
                    this.setState({ ingredient: response[0] });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
export default UseIngredientList;
