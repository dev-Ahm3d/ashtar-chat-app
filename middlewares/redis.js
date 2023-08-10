const redis = require('redis')
const { promisify } = require('util')
const redisClient = redis.createClient()
const getAsync = promisify(redisClient.get).bind(redisClient)
const setAsync = promisify(redisClient.set).bind(redisClient)

// Middleware to check cache before processing the request
exports.checkCache = async (req, res, next) => {
    const cacheKey = req.originalUrl
    // Check if the data exists in the cache
    const cachedData = await getAsync(cacheKey)
    if (cachedData) {
        // If data exists in the cache, return it
        const data = JSON.parse(cachedData)
        return res.json(data)
    } else {
        // If data doesn't exist in the cache, proceed to the next middleware
        next()
    }
}

// cache the response
exports.cacheResponse = async (req,data) => {
    const cacheKey = req.originalUrl
    // Store the response data in the cache
    await setAsync(cacheKey, JSON.stringify(data))
}

const delAsync = promisify(redisClient.del).bind(redisClient);
// Function to reset (delete) a key in Redis
exports.resetKey = async key => {
    try {
        await delAsync(key);
        console.log(`Key "${key}" reset successfully`)
    } catch (error) {
        console.error('Error resetting key:', error)
    }
}