import RedisClient from "./client/client.ts";

Deno.serve({
  port: 8000,
}, async (req) => {
  const url = new URL(req.url);
  const { pathname } = url;

  if (pathname === "/") {
    return new Response("Hello World");
  }

  if (pathname === "/redis") {
    const cache = await RedisClient.get("jsonplaceholder");
    if (cache) {
      console.log("Cache hit");
      return new Response(cache);
    }

    console.log("Cache miss");

    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    await RedisClient.set("jsonplaceholder", JSON.stringify(data));
    await RedisClient.expire("jsonplaceholder", 30);

    return new Response(JSON.stringify(data));
  }

  return new Response("Not Found", { status: 404 });
}
);