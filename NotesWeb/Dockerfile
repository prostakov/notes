# Stage 1
FROM node:lts-alpine3.13 as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm i -g @angular/cli
RUN ng build --prod --configuration production

# Stage 2
FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/NotesWeb /usr/share/nginx/html
