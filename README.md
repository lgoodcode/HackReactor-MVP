# MVP Project

The project is a simple web application that allows users to create a library of their
favorite games. The user will also be able to set a personal rating, choose the level
of completion (completed, not completed, etc.), and add a personal review of the game.

- The user will be able to select a game and see more details about it. 
- The user will also be able to add a game to their favorites list. 
- The user can also select whether they have completed the game or not.
- The user will be able to rate the game and the rating will be displayed 
on the game details page.


## **Client**

Uses Vite to build the client. Added `express` with a simple server to serve the client.

### **Environment Variables**

`VITE_RAWG_API_KEY*` - API key for RAWG API, must be public for the client to use\
`VITE_API_URL*` - URL for the API server\
`VITE_APP_TITLE*` - Title of the app, used in the header

**\*** - required

## **Server**

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

## TODO

- CHANGE PENDING TO "Not Started"
- ! Make the design responsive

- Add error handling for when unsuccessful requests are made to the API, such as adding a
  game that doesn't exist or when the client is offline.
- Don't render the cards until the data is loaded to prevent the weird black boxes
- Add search feature
- Add additional information expand on card hover
- Add view for library and wishlist tabs of user
- Add account settings page and management
- When adding a game to the library, make the menu show to select the progress and if
  none was selected and clicking outside the menu to close it, default to "pending"

- ! Create API keys for each user
- ! Implement redis store for sessions
