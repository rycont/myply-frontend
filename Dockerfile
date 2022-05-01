FROM node:16

WORKDIR /usr/src/app

RUN git clone --recursive https://github.com/rycont/myply-frontend .
RUN yarn
RUN yarn build

CMD ["npm", "run", "start"]
