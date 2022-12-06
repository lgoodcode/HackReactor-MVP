# Menelaus

## Tech Stack

### Frontend

<div width="100%">
  <img src="https://img.shields.io/badge/Vite-646CFF.svg?style=for-the-badge&logo=Vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" />
  <img src="https://img.shields.io/badge/Preact-673AB8.svg?style=for-the-badge&logo=Preact&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Router-CA4245.svg?style=for-the-badge&logo=React-Router&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white" />
  <img src="https://img.shields.io/badge/Netlify-00C7B7.svg?style=for-the-badge&logo=Netlify&logoColor=white" />
  <img src="https://img.shields.io/badge/CircleCI-343434.svg?style=for-the-badge&logo=CircleCI&logoColor=white" />
</div>

### Backend

<div width="100%">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" />
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black" />
  <img src="https://img.shields.io/badge/esbuild-FFCF00.svg?style=for-the-badge&logo=esbuild&logoColor=black" />
  <img src="https://img.shields.io/badge/CircleCI-343434.svg?style=for-the-badge&logo=CircleCI&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-46E3B7.svg?style=for-the-badge&logo=Render&logoColor=white" />
</div>

## Project Description

A simple web application that allows users to create a library of their
favorite games. The user will also be able to set a personal rating, choose the level
of completion (completed, not completed, etc.), and add a personal review of the game.

- The user will be able to select a game and see more details about it. 
- The user will also be able to add a game to their favorites list. 
- The user can also select whether they have completed the game or not.
- The user will be able to rate the game and the rating will be displayed 
  on the game details page.

## **Client**

### **Environment Variables**

`VITE_RAWG_API_KEY*` - API key for RAWG API, must be public for the client to use\
`VITE_API_URL*` - URL for the API server\
`VITE_APP_TITLE*` - Title of the app, used in the header

**\*** - required

## **Server**

### **Deployment**

The server is currently deployed at [Render](https://render.com/).

Render, by default, uses node version `14.17.0`. We want to use the `LTS` version of node,
so we need to add the `NODE_VERSION` environment variable and set it to `lts`.

### **CORS**

The server uses `cors` to allow the client to make requests to the server. When running in development,
by default, it uses `http://localhost:3000` as the origin. When running in production, it uses the
`CORS_ORIGIN` environment variable.

Because the client and server are hosted on different origins, the server must allow the client to
make requests to it. This is done by setting the `Access-Control-Allow-Origin` header to the client
origin via the `cors` middleware.

We then set another middleware for the `OPTIONS` method to allow the client to make requests where the
browser will first send an `OPTIONS` request to check if the request is allowed via preflight requests.

For the session cookies, the client must set the `credentials` option to `include` to send the cookies
with the request. The server must also set the `Access-Control-Allow-Credentials` header to `true` to
allow the client to send the cookies, which is also done via the `cors` middleware.

The `app.set('trust proxy', 1)` is required for the cookies to be sent because Netlify, or any other
hosting service, may use a proxy to serve the app. This tells Express to trust the proxy and use the
headers set by the proxy.

### **Environment Variables**

`PORT` - Port to run the server on\
`PGDATABASE*` - Name of the database\
`PGHOST` - Host of the database\
`PGPORT` - Port for the database\
`PGUSER*` - User for the database\
`PGPASSWORD*` - Password for the database\
`SESSION_SECRET*` - Secret for the cookie session\
`CORS_ORIGIN*` - Origin for CORS of the client for production

**\*** - required

### **Database**

The database is a PostgreSQL database. The database schema is in the `database` folder.\
Uses `pgcrypto` extension for encrypting user passwords and `uuid-ossp` for generating
UUIDs for the user.

When creating the users, we use the `pgcrypto` extension to encrypt the password.\
When logging in, we use the `pgcrypto` extension to encrypt the password and compare it
to the encrypted password in the database.
