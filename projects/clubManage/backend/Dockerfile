FROM node
RUN mkdir /backend
WORKDIR ./backend
COPY . /backend
RUN npm config set registry https://registry.npm.taobao.org;\
    npm install;
CMD ["npm run","server"]
