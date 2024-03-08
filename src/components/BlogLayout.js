import React, { useState, useEffect } from "react";

const BlogLayout = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching blog posts from an API
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // This is a placeholder for actual API call
        // e.g., const response = await fetch('https://api.example.com/posts');
        // const data = await response.json();
        const data = [
          { id: 1, title: "Post 1", content: "This is the first post." },
          { id: 2, title: "Post 2", content: "This is the second post." },
        ];
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-layout">
      <main className="blog-main">
        {isLoading ? (
          <p>Loading posts...</p>
        ) : (
          posts.map((post) => (
            <article key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </article>
          ))
        )}
      </main>
      <aside className="blog-sidebar">
        <nav>
          <ul>
            <li>
              <a href="#!">Home</a>
            </li>
            <li>
              <a href="#!">About</a>
            </li>
            <li>
              <a href="#!">Contact</a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default BlogLayout;
