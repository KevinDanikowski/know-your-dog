import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { uploadFile } from "../../actions/imageActions";
import Spinner from "../common/Spinner";

class Dashboard extends Component {
  componentDidMount() {}
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  fileUploadHandler = event => {
    const formData = new FormData();
    formData.append("image", this.state.selectedFile);
    this.props.uploadFile(formData, this.props.history);
  };

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  render() {
    const { user } = this.props.auth;
    let dashboardContent;

    // user logged in but has no images
    // dashboardContent = (
    //   <div>
    //     <p className="lead text-muted">Welcome {user.name}</p>
    //     <p>You have not any images yet</p>
    //     <Link to="/upload" className="btn btn-lg btn-info">
    //       Upload Image
    //     </Link>
    //   </div>
    // );

    return (
      <div id="container">
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { uploadFile }
)(withRouter(Dashboard));

// export default Dashboard;
