import { useState, useEffect } from "react";
import { APITester } from "./APITester";
import "./index.css";

interface BlogPost {
  slug: string;
  title: string;
}

export function App() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blog")
      .then(r => r.json())
      .then(data => setPosts(data.posts.sort((a, b) => b.slug.localeCompare(a.slug))))
      .catch(err => console.error("Failed to load blog posts:", err));
  }, []);
console.log('posts', posts);
  return (
    <div className="app">
      <h1>Welcome</h1>

      <section style={{ marginTop: "2rem" }}>
        <h2>My Posts</h2>
        {posts.length > 0 ? (
          <ul style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
            {posts.map(post => (
              <li key={post.slug} style={{ marginBottom: "0.5rem" }}>
                <a href={`/blog/${post.slug}`} style={{ textTransform: "capitalize" }}>
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Sorry, there is currently no content to be displayed.</p>
        )}
      </section>

      {/*<APITester />*/}
    </div>
  );
}

export default App;
