# FROM node:20.11.0-alpine3.19

# WORKDIR /app
# COPY ./package*.json ./
# RUN npm i
# COPY . .

# EXPOSE 3000


FROM node:20.11.0-alpine3.19 as base

# RUN apk add --no-cache g++ make py3-pip libc6-compat
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
apk add doppler

WORKDIR /app
EXPOSE 3000

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["sh", "scripts/start-prod"]




# FROM base as dev
# ENV NODE_ENV=development
# COPY . .
# CMD npm run dev

# https://medium.com/@itsuki.enjoy/dockerize-a-next-js-app-4b03021e084d
# https://javascript.plainenglish.io/reduce-docker-image-size-for-your-next-js-app-bcb65d322222
# https://betterprogramming.pub/how-to-reduce-docker-image-size-by-81-frontend-next-js-practice-8680bda50fee
