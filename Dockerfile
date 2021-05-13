# pull the base image
FROM node:14

# set the working direction
WORKDIR /app

RUN npm install yarn

# install app dependencies
COPY package.json ./

RUN yarn install

# add app
COPY . ./

# start app
CMD ["yarn", "start"]