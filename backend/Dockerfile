#build stage
FROM node:12.18-alpine

LABEL MAINTAINER="Penguin Cho"
LABEL version="1.0.2"

WORKDIR /ito-backend
COPY . /ito-backend

RUN apk update
RUN apk add tzdata \
  git \
  && cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime \
  && apk del tzdata
RUN yarn install --silent --production

CMD ["npm", "start"]