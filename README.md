# AdvancedNodeStarter

A project for a course on Advanced Node @ Udemy

## used as a base:
https://github.com/StephenGrider/AdvancedNodeComplete/


### use node version 20
nvm use 20

### Installation

- `npm i` in the root
- `npm install --legacy-peer-deps` in the `client` directory
- `npm run dev` in the root dir

### Configure
create a .evn file base on sample with the proper env variables

#### MongoDB
Create and configure free cluster and user access in https://cloud.mongodb.com/

#### AWS S3
create s3 bucket, open for the public
create aws app user with policy to upload files
put the user keys into .env
create client/.env.development base on .sample and configure the right s3.bucket name there
