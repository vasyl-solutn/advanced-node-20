import React, { useState } from 'react';
import { reduxForm } from 'redux-form';
import BlogForm from './BlogForm';
import BlogFormReview from './BlogFormReview';
import { useNavigate } from 'react-router-dom';

const BlogNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);

  const navigate = useNavigate();

  const renderContent = () => {
    if (showFormReview) {
      return (
        <BlogFormReview
          onCancel={() => setShowFormReview(false)}
          navigate={navigate}
        />
      );
    }

    return (
      <BlogForm
        onBlogSubmit={() => setShowFormReview(true)}
      />
    );
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export default reduxForm({
  form: 'blogForm'
})(BlogNew);
