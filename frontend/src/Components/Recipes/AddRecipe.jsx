import React from "react";
import { useState } from "react"
import log from "../../utils/constants";
import { user_id } from "../../utils/constants";
import ListIngredients from "../ListIngredients";
import AuthService from "../../services/auth.service";



function AddRecipe(props){
  let selectedIngredients = []

  const addRecipeToDB = () => {
    log("Do Register!")
    if(recipename !== "" && instructions !== "" && selectedIngredients.length !== 0)
      {        
          AuthService.addrecipe(recipename,instructions,user_id,selectedIngredients, imageFile).then(function (response) {
            //handle success
             console.log(response)
             if(response.data.successCode === 1){
              console.log(response.data.successCode)
             alert("Recipe added")             
             }  
          })
          .catch((error) => {
            //console.log(error);
            log(error + "")
          });

      }
      else{
        alert("Please Enter Valid Details!")
            
      }
  }
  
  const onIngredientsChange = (ingredients) =>{
    var ingredientsArray = []
    ingredients.forEach(element => {
      ingredientsArray.push(element.value)
    });
    //console.log(ingredientsArray)
    selectedIngredients = ingredientsArray
    //console.log(selectedIngredients)
  }
  require('typeface-quicksand')
    const [recipename,setrecipename] = useState("");
    const [instructions,setinstructions] = useState("");
    const [imageFile,setImageFile] = useState(null);

   
    

    return( 
        <div className={'mt-32'}>
        <form class= { `
          bg-gradient-to-r from-${props.bgcolor}-300 via-${props.bgcolor}-500 to-${props.bgcolor}-700
          shadow-lg
          ml-40 
          mr-40 
          rounded-md
          mt-10 
          px-8 
          pt-6 
          pb-8 
          mb-4 `}>
        <div class="mb-4">
        <label class="block 
        text-left 
      text-gray-700
        text-sm 
        font-bold 
        mb-2">
           Add Recipe Name
        </label>
        <input class="shadow 
        appearance-none
        border 
        rounded 
        w-full 
        py-2 
        px-3 
        text-gray-700 
        leading-tight 
        focus:outline-none 
        focus:shadow-outline" onChange={ e =>{ setrecipename(e.target.value) }}  id="recipename" type="text" placeholder="Name"/>
        </div>
        <div class="mb-4">
        <label class="block 
        text-left 
      text-gray-700
        text-sm 
        font-bold 
        mb-2" for="username">
           Enter Recipe Instructions
        </label>
        <textarea class="shadow 
        appearance-none
        border 
        rounded 
        w-full 
        py-2 
        px-3 
        text-gray-700 
        leading-tight 
        focus:outline-none 
        focus:shadow-outline"  onChange={ e =>{ setinstructions(e.target.value) }}  id="instructions" type="text" placeholder="instruction"/>
        </div>
        <div class="mb-6">
        <label class="block 
        text-left 
      text-gray-700 
        text-sm 
        font-bold 
        mb-2" for="avtar">
            Enter Recipe Image
        </label>
        <input class="shadow 
        appearance-none 
        border 
        rounded 
        w-full 
        py-2 
        px-3 
        text-gray-700 
        leading-tight 
        focus:outline-none 
        focus:shadow-outline"   id="avtar" type="file"
        onChange={ e =>{ setImageFile(e.target.files[0]) }} accept="image/png, image/jpeg, image/jpg"/>
        </div>

        <label class="block 
        text-left 
      text-gray-700 
        text-sm 
        font-bold 
        mb-2" for="avtar">
            Select Ingredients
        </label>
        
        <ListIngredients onChange = {onIngredientsChange}/>
        
        <div className="flex items-center justify-between">
            <button className="bg-green-500
             mt-7
             px-4 
             rounded-lg 
             py-4 
             hover:bg-green-700
              font-bold 
              text-white"
              onClick={addRecipeToDB}
              >Add Recipe</button>
        </div>
        
        </form>
    
        </div>
    )
}


export default AddRecipe;