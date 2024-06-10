import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchBlog } from '../../actions';
import { useParams } from 'react-router-dom';

function BlogShow({ fetchBlog }) {
  const { _id } = useParams();
  const [blog, setBlog] = useState(null);

  const renderImage = () => {
    if (blog.imageUrl) {
      return (
        <img
          src={
            `https://s3-eu-central-1.amazonaws.com/${process.env.REACT_APP_BUCKET_NAME}/${blog.imageUrl}`
          }
        />
      );
    }
  }

  useEffect(() => {
    const fetchAndSetBlog = async () => {
      const fetchedBlog = await fetchBlog(_id);
      console.log('fetchedBlog', fetchedBlog);
      setBlog(fetchedBlog);
    };

    fetchAndSetBlog();
  }, [_id, fetchBlog]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const { title, content } = blog;

  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
      {renderImage()}
    </div>
  );
}

export default connect(null, { fetchBlog })(BlogShow);
