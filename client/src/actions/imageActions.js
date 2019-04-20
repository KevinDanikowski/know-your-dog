import { PREDICTIONS } from "./types";
import axios from "axios";

export const uploadFile = (formData, history) => dispatch => {
  axios
    .post("/api/images/upload", formData)
    .then(res => {
      console.log(res.data.url);
      axios
        .post("/api/dogs/dogs", { imageUrl: res.data.url })
        // const responseGoogleVision = axios({
        //   method: "post",
        //   url: "https://vision.googleapis.com/v1/images:annotate",
        //   params: {
        //     key: "AIzaSyD3OvnQIWVnRuT3_xD-hto1xk4kn74G3xs"
        //   },
        //   headers: {
        //     Authorization:
        //       "Bearer ya29.c.El_sBjRK0MdngfNfOPMyv6MQGmag3CtEp5BRieeO3WC1BeKCFvURIQSUPMjP0EDK39j756HvyXSJ9zbQ49xgMQfgBc3GeDfBkoZP6Nx45i8h8wm_JkIOIXycMvKWZSHFUg"
        //   },
        //   data: {
        //     requests: [
        //       {
        //         image: {
        //           source: {
        //             imageUri: res.data.url
        //           }
        //         },
        //         features: [
        //           {
        //             type: "WEB_DETECTION",
        //             maxResults: 5
        //           }
        //         ]
        //       }
        //     ]
        //   }
        // })
        .then(function(response) {
          // console.log("****** WEB-DETECTION *****");
          // console.log(response.data.responses[0].webDetection.webEntities);

          // var webEntities = response.data.responses[0].webDetection.webEntities;

          // var predictions = webEntities.map(entity => {
          //   return entity.description;
          // });
          console.log(" ******** IMAGE ACTIONS *********");
          console.log("response.data.description", response);

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
