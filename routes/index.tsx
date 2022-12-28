import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

interface User {
  login: string;
  name: string;
  avatar_url: string;
}

export const handler: Handlers<User | null> = {
  async GET(_, ctx) {
    const { username } = ctx.params;
    const resp = await fetch(`https://api.github.com/users/${username}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const user: User = await resp.json();
    return ctx.render(user);
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Cocktailsss</title>
        <link rel="stylesheet" href="public/main.css" />
        <meta name="description" content="Drink recipes" />
      </Head>
      <div>
        <h1>Cocktails</h1>
        <img
          src="/logo.svg"
          width="128"
          height="128"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p>
          This is rendered from ./routes/index.tsx
        </p>
        <p>
          Counter: <Counter start={3} />
        </p>
      </div>
    </>
  );
}
