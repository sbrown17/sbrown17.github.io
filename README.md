# bun-react-template

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To build as a static site for production:

```bash

bun run build
```

To run for production:

```bash
bun start
```
This project was created using `bun init` in bun v1.3.3. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

To run the static files locally at `http://127.0.0.1:8000/`:

```bash
cd dist/ && python -m http.server 8000
``` 

Todo:
- [x] move blogs into src
- [ ] refactor blog html into its own component file
