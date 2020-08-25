import axios from "axios";
import * as Config from "./../constants/Config";

function callAPI(endpoint, method = "GET", body){
  // console.log("hovanco", body)
  return axios({
    url: `${Config.API_URL}/${endpoint}`,
    method: method,
    data: body
  }).catch(err => {
    console.log(err);
  });
};

export default callAPI;