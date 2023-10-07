FROM ubuntu:20.04
FROM node:16-bullseye
# ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build
COPY . .
EXPOSE 3333
CMD ["npm", "run", "start:prod"]