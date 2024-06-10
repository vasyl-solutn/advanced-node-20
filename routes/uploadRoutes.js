const AWS = require('aws-sdk');
const { v1: uuid } = require('uuid');
const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
  },
  region: 'eu-central-1',
});

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;

    const bucketName = process.env.BUCKET_NAME;
    const contentType = 'image/jpeg';

    s3.getSignedUrl(
      'putObject',
      {
        Bucket: bucketName,
        ContentType: contentType,
        Key: key
      },
      (err, url) => res.send({ key, url })
    );
  });
};
