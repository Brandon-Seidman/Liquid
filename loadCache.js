const bluebird = require('bluebird');
const redis = require('redis');
const postData = require('./data/posts');

const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);

const loadCache = async () => {
    try {
        client.flushdb();
        const posts = await postData.getAllPosts();
        if (!posts) throw "Could not load posts";
        for (let post of posts) {
            await client.zaddAsync("likes", post.likes || 0, post._id);
            await client.zaddAsync("views", post.views || 0, post._id);
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports = loadCache;