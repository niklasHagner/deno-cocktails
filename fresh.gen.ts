// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/about.tsx";
import * as $1 from "./routes/api/joke.ts";
import * as $2 from "./routes/cocktails.tsx";
import * as $3 from "./routes/github/[username].tsx";
import * as $4 from "./routes/index.tsx";
import * as $$0 from "./islands/Counter.tsx";
import * as $$1 from "./islands/IngredientFilterButton.tsx";

const manifest = {
  routes: {
    "./routes/about.tsx": $0,
    "./routes/api/joke.ts": $1,
    "./routes/cocktails.tsx": $2,
    "./routes/github/[username].tsx": $3,
    "./routes/index.tsx": $4,
  },
  islands: {
    "./islands/Counter.tsx": $$0,
    "./islands/IngredientFilterButton.tsx": $$1,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
