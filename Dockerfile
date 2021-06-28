## stage: 1
FROM node:15-alpine
# file handling
RUN mkdir -p /src
COPY . /src
WORKDIR /src
COPY package.json ./

# install all dependencies
RUN npm install

#expose api port
EXPOSE 3050

# entrypoint
CMD ["npm","start"]
