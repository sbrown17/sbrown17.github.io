import { serve } from "bun";
import { marked } from "marked";
import { readdir } from "node:fs/promises";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve blog posts
    "/blog/:slug": async (req) => {
      const slug = req.params.slug;
      const filePath = `./blog/${slug}.md`;

      try {
        const file = Bun.file(filePath);
        const markdown = await file.text();
        const html = await marked(markdown);
        const titleStringWithExt = slug.slice(11);
        const titleString = titleStringWithExt.replace('-', ' ').split('.')[0];
        // Return HTML page with the rendered markdown
        return new Response(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>${titleString}</title>
              <style>
                body {
                  max-width: 800px;
                  margin: 0 auto;
                  padding: 2rem;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                  line-height: 1.6;
                  color: #333;
                }
                a {
                  color: #0066cc;
                  text-decoration: none;
                }
                a:hover {
                  text-decoration: underline;
                }
                code {
                  background: #f4f4f4;
                  padding: 0.2rem 0.4rem;
                  border-radius: 3px;
                  font-family: 'Courier New', monospace;
                }
                pre {
                  background: #f4f4f4;
                  padding: 1rem;
                  border-radius: 5px;
                  overflow-x: auto;
                }
                pre code {
                  background: none;
                  padding: 0;
                }
                blockquote {
                  border-left: 4px solid #ddd;
                  margin: 1rem 0;
                  padding-left: 1rem;
                  color: #666;
                }
                img {
                  max-width: 100%;
                  height: auto;
                }
              </style>
            </head>
            <body>
              <nav>
                <a href="/">← Back to home</a>
              </nav>
              <article class="blog-post">
                ${html}
              </article>
            </body>
          </html>
        `, {
          headers: { "Content-Type": "text/html" },
        });
      } catch (error) {
        return new Response(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>Blog Post Not Found</title>
            </head>
            <body>
              <h1>404 - Blog post not found</h1>
              <p>The blog post "${slug}" does not exist.</p>
              <a href="/">← Back to home</a>
            </body>
          </html>
        `, {
          status: 404,
          headers: { "Content-Type": "text/html" },
        });
      }
    },

    // API to list all blog posts
    "/api/blog": async () => {
      try {
        const files = await readdir("./blog");
        const posts = files
          .filter(f => f.endsWith(".md"))
          .map(f => ({
            slug: f.replace(".md", ""),
            title: f.replace(".md", "").replace(/-/g, " "),
          }));
        return Response.json({ posts });
      } catch {
        return Response.json({ posts: [] });
      }
    },

    "/api/hello": {
      async GET() {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT() {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    // Serve index.html for all unmatched routes.
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
