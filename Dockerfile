# Stage 1: Build the React application
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile
COPY . .

ARG REACT_APP_API_URL=https://localhost:7118/
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN yarn build


FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]