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

`VITE_RAWG_API_KEY` - API key for RAWG API, must be public for the client to use
`VITE_API_URL` - URL for the API server
`VITE_APP_TITLE` - Title of the app, used in the header


## **Server**

### **Environment Variables**

`PORT` - Port to run the server on
`PGDATABASE` - Name of the database
`PGHOST` - Host of the database
`PGPORT` - Port for the database
`PGUSER` - User for the database
`PGPASSWORD` - Password for the database
`SESSION_SECRET` - Secret for the session

### **Database**

The database is a PostgreSQL database. The database schema is in the `database` folder.\
Uses `pgcrypto` extension for encrypting user passwords and `uuid-ossp` for generating
UUIDs for the user.

When creating the users, we use the `pgcrypto` extension to encrypt the password.\
When logging in, we use the `pgcrypto` extension to encrypt the password and compare it
to the encrypted password in the database.
