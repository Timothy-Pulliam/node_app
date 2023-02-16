## Set Up Local Dev Environment

Clone this repository
`git clone git@github.com:Timothy-Pulliam/node_app.git`
`cd node_app`

Install npm dependencies
`npm install`

docker-compose up the mongo, and app containers
`docker-compose --env-file ./.env -f Docker/docker-compose.yml up`

Connect to mongo db locally using mongosh
`mongodb://root:example@localhost:27017`

Connect to redis locally using redis-cli
`node_modules/redis-cli/bin/rdcli`

## Security
The Dockerfile was written using the following security best practices
https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/