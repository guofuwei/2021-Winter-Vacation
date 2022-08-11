FROM node
RUN mkdir /client
WORKDIR /client
COPY . /client
RUN npm config set registry https://registry.npm.taobao.org;\
    npm install;\
    npm install --global vue-cli;
CMD ["npm run","serve"] 
