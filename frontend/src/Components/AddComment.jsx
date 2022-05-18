/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react"
import axios from 'axios'
import {BACKEND_URL, user_id} from "../utils/constants";

function AddComment(){
    require('typeface-quicksand')
    const [comment,setcomment]=useState("")
    var parts=window.location.href.split("/");
    const recipeId=parts[parts.length-1];

    const doComment = ()=>{
        if(comment.trim().length===0){
            alert("Please enter comment for the recipe");
        }
        else{
            var commentData= new FormData();
            commentData.append("recipeId",recipeId);
            commentData.append("commentorId",1)
            commentData.append("comment",comment.trim())

            axios({
                method: "post",
                url: `${BACKEND_URL}/api/comment`,
                data: commentData,
                headers: { "Content-Type": "multipart/form-data" },
              }).then(function (response) {
                //handle success
                console.log(response);
              })
              .catch(function (response) {
                //handle error
                console.log(response);
              });
        }
    }
    if (user_id === ""){
        return(
            <div className="flex justify-center">
                <a href="/login" className="bg-green-500
                 px-4 
                 rounded-lg
                 py-4
                 hover:bg-green-700
                  font-bold 
                  text-white">Please login to comment on this recipe</a>
            </div>
        )
    }
    else{
        return(
            <div className="flex justify-center">
                <textarea className="border-2 mt-2" onChange={e=>{setcomment(e.target.value)}}></textarea>
                <button className="bg-green-500
                 px-4 
                 rounded-lg 
                 py-4 
                 hover:bg-green-700
                  font-bold 
                  text-white" onClick={doComment}>Comment</button>
            </div>
        )
    }
}
export default AddComment;