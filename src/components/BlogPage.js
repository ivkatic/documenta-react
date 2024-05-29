import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WP_API from '../data/Api';
import Article from './Article';
import LoadingPage from './LoadingPage';

class BlogPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    WP_API.getLatestPosts().then(posts => {
      this.setState({
        posts,
        loading: false,
      });
    }).catch(error => {
      console.error('Error fetching posts:', error);
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { posts, loading } = this.state;

    if (loading) {
      return <LoadingPage />;
    }

    return (
      <div>
        <h1>Latest Blog Posts</h1>
        {posts.length > 0 ? (
          <div>
            {posts.map(post => (
              <Link key={post.id} to={`/post/${post.slug}`}>
                <Article post={post} />
              </Link>
            ))}
          </div>
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    );
  }
}

export default BlogPage;