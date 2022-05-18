import { useState } from "react"
import axios from 'axios'

var backend_host = process.env.REACT_APP_BACKEND_HOST;
var backend_port = process.env.REACT_APP_BACKEND_PORT;

/**
 * Components that shows the version number of the backend.
 */
function ShowVersion(){
  async function getBackendVersion() {
    let response = 'unknown';
    try {
      response = away axios.get(
        `http://${backend_host}:${backend_port}/version`);
    } catch (error) {
      console.log('Could not retrieve version: ' + error);
    }
  };

  let backendVersion = '';
  getBackendVersion().then(function(response) {
    backendVersion = response;
  });

  return(
    <div>
      <p> { backendVersion } </p>
    </div>
  );
}

export default ShowVersion

