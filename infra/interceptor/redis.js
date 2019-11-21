const redis = require("redis")
const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST)

module.exports =  {
  client
}