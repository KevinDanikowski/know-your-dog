import { GET_FILES, UPLOAD_FILE } from "./types";
import axios from "axios";

export const getFiles = () => dispatch => {
  axios
    .get("/api/images/")
    .then(res => console.log(res))
    .catch(err =>
      dispatch({
        type: GET_FILES,
        payload: err.response.data
      })
    );
};

export const uploadFile = (formData, history) => dispatch => {
  axios
    .post("/api/images/upload", formData)
    .then(res => {
      console.log(res.data.url);

      // let body = {
      //   requests: [
      //     {
      //       image: {
      //         source: {
      //           imageUri: "https://i.imgur.com/Nlot5mR.jpg" //image URL
      //         }
      //       },
      //       features: [
      //         {
      //           type: "TEXT_DETECTION",
      //           maxResults: 1
      //         }
      //       ]
      //     }
      //   ]
      // };

      // axios
      //   .post(
      //     "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyD3OvnQIWVnRuT3_xD-hto1xk4kn74G3xs",
      //     body
      //   )
      //   .then(response => console.log(response));

      try {
        let body = JSON.stringify({
          requests: [
            {
              features: [{ type: "WEB_DETECTION", maxResults: 5 }],
              image: {
                source: {
                  imageUri: res.data.url
                }
              }
            }
          ]
        });
        let response = fetch(
          "https://vision.googleapis.com/v1/images:annotate?key=" +
            "AIzaSyD3OvnQIWVnRuT3_xD-hto1xk4kn74G3xs",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST",
            body: body
          }
        );
        console.log(response.responses);
      } catch (error) {
        console.log(error);
      }
    })
    .catch(err => console.log(err));
};
