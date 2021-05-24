const redisClient = require('./redis-client');

const save = async (req, res) => {
    const { key } = req.params;
    const value = req.body;
    //console.log(req.url);
    //console.log(url.parse(req.url,true));
    //console.log(JSON.stringify(url.parse(req.url,true).query));
  
    await redisClient.setAsync(key, JSON.stringify(value));
    return res.send('Success');
};

const getContent = async (req, res) => {
    const { key } = req.params;
    const rawData = await redisClient.getAsync(key);
    return res.json(JSON.parse(rawData));
};

module.exports = {
    save,
    getContent
};

