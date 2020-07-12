FROM node:alpine
WORKDIR csv-to-json
COPY ./package.json .
RUN npm install
COPY ./ ./
CMD ["npm","start"]
