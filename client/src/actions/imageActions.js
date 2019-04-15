import { PREDICTIONS } from "./types";
import axios from "axios";

export const uploadFile = (formData, history) => dispatch => {
  axios
    .post("/api/images/upload", formData)
    .then(res => {
      console.log(res.data.url);
      axios
        .post("/api/dogs/dogs", { imageUrl: res.data.url })
        .then(function(response) {
          dispatch({
            type: PREDICTIONS,
            payload: response.data
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    })

    .catch(err => console.log(err));
};
