FROM node:16
WORKDIR /backend
COPY . /backend
RUN npm config set registry http://registry.npm.taobao.org;\
    npm install;\
    npm install nodemon -g
CMD ["npm","run","server"]
