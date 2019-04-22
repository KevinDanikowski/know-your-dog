import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class DogItem extends Component {
  render() {
    const { dog } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              src={dog.image}
              alt=""
              width="300"
              height="300"
              className="rounded-circle"
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{dog.breed}</h3>
            <p>
              {isEmpty(dog.probability) ? null : (
                <span>at {dog.probability}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

DogItem.propTypes = {
  dog: PropTypes.object.isRequired
};

export default DogItem;
