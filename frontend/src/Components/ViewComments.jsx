import React from "react";
import { BACKEND_URL } from "../utils/constants";

class ViewComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const Comment = (comment) => {
      return (
        <div class="w-full flex items-center justify-between p-6 space-x-6">
          <img
            class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
            alt=""
          />
          <div class="flex-1 truncate">
            <div class="flex items-center space-x-3">
              <h3 class="text-gray-900 text-sm font-Lobster tracking-tight font-medium truncate">
                {comment.full_name}
              </h3>
            </div>
            <p class="mt-1 text-gray-500 text-sm truncate">{comment.comment}</p>
            <p class="mt-1 text-gray-500 text-sm truncate">{comment.date_added}</p>
            
          </div>
        </div>
      );
    };
    if (this.state.comments.length === 0) {
      return (
        <div className=" px-10 py-2 flex justify-center">
          No comments for this recipe yet
        </div>
      );
    } else {
      return (
        <div>{
          (this.state.comments.length > 0) ?  this.state.comments.map((comment) => Comment(comment)) : ""}</div>
      );
    }
  }

  fetchData() {
    fetch(`${BACKEND_URL}/api/view_comments/${this.props.id}`)
      .then((response) => response.json())
      .then((response) => {
        this.setState({ comments: response });
      });
  }
}

export default ViewComments;
