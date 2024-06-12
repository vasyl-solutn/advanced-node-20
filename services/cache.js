const mongoose = require('mongoose');
const redis = require('redis');
const keys = require('../config/keys');

const client = redis.createClient({ url: keys.redisUrl });
client.connect();
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');

  return this;
};

mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  // store the expiration in the separated key. as hSet doesn't support EX: option
  const expirationValidationKey = `${this.hashKey}-${key}-expiration-is-valid`
  const isValid = await client.get(expirationValidationKey)

  // see if the value stored in redis isn't expired yet
  if (isValid) {
    // See if we have a value for 'key' in redis
    const cacheValue = await client.hGet(this.hashKey, key);
    // If we do, return that
    if (cacheValue) {
      const doc = JSON.parse(cacheValue);

      return Array.isArray(doc)
        ? doc.map(d => new this.model(d))
        : new this.model(doc);
    }
  }

  // Otherwise, issue the query and store the result in redis
  const result = await exec.apply(this, arguments);

  await client.hSet(this.hashKey, key, JSON.stringify(result));
  client.set(expirationValidationKey, 'true', { 'EX': 15})

  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};
