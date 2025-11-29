import { serve } from "bun";
import { marked } from "marked";
import { readdir } from "node:fs/promises";
import { Posts } from "./Posts";
import index from "./index.html";

const server = serve({
  routes: {
    // Serve blog posts
    "/blog/:slug": async (req) => {
      const slug = req.params.slug;
      if (!slug) {
        return new Response("Blog post not found", { status: 404 });
      }

      const filePath = `./src/blog/${slug}.md`;

      try {
        const file = Bun.file(filePath);
        const markdown = await file.text();
        const html = await marked(markdown);
        const titleStringWithExt = slug.slice(11);
        const titleString = titleStringWithExt.replace('-', ' ').split('.')[0];

        return Posts({ titleString, html });
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
        const files = await readdir("./src/blog");
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
