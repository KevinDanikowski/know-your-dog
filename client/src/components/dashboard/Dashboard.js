import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { uploadFile } from "../../actions/imageActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  fileUploadHandler = event => {
    console.log("*********************");
    console.log(this.state.selectedFile);
    console.log("*********************");
    // const data = new FormData();
    // data.append("file", this.state.selectedFile);
    // axios.post("/upload", data).then(response => {
    //   console.log(response); // do something with the response
    // });
    // try {
    //   let { selectedFile } = this.state;
    //   let body = JSON.stringify({
    //     requests: [
    //       {
    //         features: [{ type: "WEB_DETECTION", maxResults: 5 }],
    //         image: {
    //           source: {
    //             imageUri:
    //               "http://i3.kym-cdn.com/photos/images/facebook/000/242/592/1c8.jpg"
    //           }
    //         }
    //       }
    //     ]
    //   });
    //   let response = await fetch(
    //     "https://vision.googleapis.com/v1/images:annotate?key=" +
    //       "AIzaSyD3OvnQIWVnRuT3_xD-hto1xk4kn74G3xs",
    //     {
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json"
    //       },
    //       method: "POST",
    //       body: body
    //     }
    //   );
    //   let responseJson = await response.json();
    //   console.log(responseJson);
    //   this.setState({
    //     googleResponse: responseJson,
    //     uploading: false
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    // let sendimage = {
    //   image: this.state.selectedFile
    // };
    const formData = new FormData();
    formData.append("image", this.state.selectedFile);

    this.props.uploadFile(formData, this.props.history);
  };

  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    console.log("Upload image to endpoint");
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //check of logged in user has empty data
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4> To-Do: Display all images</h4>;
      } else {
        // user logged in but has no images
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not any images yet</p>
            <Link to="/upload" className="btn btn-lg btn-info">
              Upload Image
            </Link>
          </div>
        );
      }
    }

    return (
      <div id="container">
        Welcome {user.name}
        {dashboardContent}
        <h1>Image Processing</h1>
        <input type="file" name="myImage" onChange={this.fileSelectedHandler} />
        <Button
          type="submit"
          variant="secondary"
          onClick={this.fileUploadHandler}
        >
          Process
        </Button>
      </div>
    );
  }
}

Dashboard.propTypes = {
  uploadFile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { uploadFile, getCurrentProfile }
)(withRouter(Dashboard));

// export default Dashboard;
