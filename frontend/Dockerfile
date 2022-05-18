FROM node:16-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY . ./

RUN npm cache clean --force
RUN npm cache verify
RUN npm install

# start app
EXPOSE 3000

# FIXME: Instead of using the create-react-app scripts to run our frontend,
# TODO: we should use a faster NGINX server.
CMD ["npm", "start"]

