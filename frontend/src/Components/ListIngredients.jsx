import React from "react";
import { BACKEND_URL } from "../utils/constants";
import {  Component } from 'react'
import axios from 'axios'
import Select from 'react-select'



class ListIngredients extends Component {
  constructor(props){
    super(props)
    this.state = {
      dropDownOpt : [],
      id: "",
      name: ''
    }
  }

 async renderData(){
    const API = await axios.get(`${BACKEND_URL}/api/ingredients`)
    const serverResponse = API.data

    const dropDownValue = serverResponse.map((response) => ({
      "value" : response.id,
      "label" : response.name
    }))
    this.setState(
      {
        dropDownOpt: dropDownValue
      }
    )
   
  }
  onChange(event){
    console.log(event);
    this.props.onChange(event)
   this.setState(
     {
       id: event.value,
       name: event.label
      }
    )
    
  }
  componentDidMount(){
      this.renderData()
  }
  render() {
    return (
      <div className="App">
        <Select 
        options={this.state.dropDownOpt} 
        onChange={this.onChange.bind(this)}
        isMulti 
        />
      </div>
    )
  }
}

export default ListIngredients;