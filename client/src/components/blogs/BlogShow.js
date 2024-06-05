import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchBlog } from '../../actions';
import { useParams } from 'react-router-dom';

function BlogShow({ fetchBlog }) {
  const { _id } = useParams();
  const [blog, setBlog] = useState(null);

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
    </div>
  );
}

export default connect(null, { fetchBlog })(BlogShow);
