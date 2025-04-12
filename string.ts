import RedisClient from "./client.ts"

async function init() {
    // await client.set("msg:5", "Hello from Node JS")
    // : is the delimiter for the key
    const res = await RedisClient.get("msg:5")
    console.log("Result -> ", res)

    // add a list
    await RedisClient.lpush("list", "Hello from Deno")
    await RedisClient.lpush("list", "Hello from Deno 2")
    await RedisClient.lpush("list", "Hello from Deno 3")
    await RedisClient.lpush("list", "Hello from Deno 4")
}

init()
