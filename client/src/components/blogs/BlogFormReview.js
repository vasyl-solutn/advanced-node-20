// BlogFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';

const BlogFormReview = ({ onCancel, formValues, submitBlog, navigate }) => {
  console.log(formValues);

  const onSubmit = async (event) => {
    event.preventDefault();

    await submitBlog(formValues, image);

    navigate('/blogs');
  };

  const renderFields = () => {
    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues[name]}</div>
        </div>
      );
    });
  }

  const renderButtons = () => {
    return (
      <div>
        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button className="green btn-flat right white-text">
          Save Blog
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  }

  const [image, setImage] = React.useState(null);

  const handleFileUpload = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <form onSubmit={onSubmit}>
      <h5>Please confirm your entries</h5>
      {renderFields()}

      <h5>Add An Image</h5>
      <input
        onChange={handleFileUpload}
        type="file"
        accept="image/*"
      />

      {renderButtons()}
    </form>
  );
}

function mapStateToProps(state) {
  return { formValues: state.form.blogForm.values };
}

export default connect(mapStateToProps, actions)(BlogFormReview);
