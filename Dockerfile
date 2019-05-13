# base image
FROM node:10.15.0-alpine

# set working directory
RUN mkdir -p /usr/src/app/api
WORKDIR /usr/src/app/api

# install and cache app dependencies
COPY package.json /usr/src/app/api
COPY package-lock.json /usr/src/app/api
RUN npm install

COPY . /usr/src/app/api

# start app
CMD ["npm", "run", "dev"]
