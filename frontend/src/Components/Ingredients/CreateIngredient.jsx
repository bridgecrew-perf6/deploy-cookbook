// import React, { useState } from 'react';
// import axios from 'axios';
import React, { Component } from "react";
import { BACKEND_URL } from "../../utils/constants";
import authHeader from "../../services/auth-header";
import cookie from "react-cookies";

class CreateIngredient extends Component {
    constructor() {
        super();
        this.state = {
            fname: '',
        };

        this.fnameChange = this.fnameChange.bind(this);
        this.createingredients = this.createingredients.bind(this);
    }
    fnameChange(event) {
        this.setState({ fname: event.target.value });
    }

    render() {
        return (
            <div className="SaveIngredient mt-20 p-12">
                <form class=" rounded-md mt-10  px-8   pt-6  pb-8  mb-4" id="regform">
                    <h1 className="text-left my-5 font-QuickSand font-semibold text-medium">Create Ingredient</h1>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Name
                        </label>
                        <input class=" shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " required="required" onChange={this.fnameChange} value={this.state.fname} type="text" name="name" maxLength="255" />
                    </div>

                    <div className="flex items-center justify-between">
                        <button type="button" className=" bg-transparent hover:bg-yellow-500 hover:bg-yellow-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded " onClick={this.createingredients}>Submit</button>

                    </div>
                </form>
            </div>

        );
    }
    createingredients() {
        //here check session user only Admin add intgredent
        if ((this.state.fname !== "") && (this.state.fname !== null)) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', ...authHeader() },
                body: JSON.stringify(this.state)
            };
            fetch(`${BACKEND_URL}/api/ingredients/save`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        alert(data.msg);
                    }
                    else {
                        //alert('Ingredients Added Successfully');
                        window.location.href = "/ingredients/success";
                        // console.log(JSON.stringify(this.state));
                    }

                });
        }
        else {
            alert("Please enter Name.");
        }
    }
}

export default CreateIngredient;