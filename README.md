# Parcel Delivery Service

This project is a simple implementation of a parcel delivery service that handles the collection and delivery of parcels in Cologne, Germany. The service is operated by bikers who pick up and deliver the parcels.
Features

The service provides the following features:

    A sender can create a parcel by specifying the pick-up and drop-off address.
    A sender can see the status of his parcels.
    A biker can see a list of parcels that need to be delivered.
    A biker can pick up a parcel.
    Once a parcel is picked up by a biker, it cannot be picked up by other bikers.
    A biker can input the timestamp of the pickup and the delivery for each order.
    The status of the order is updated for the sender.

## Technologies Used

The project uses the following technologies:

    Node.js
    Express.js
    PostgreSQL
    Redis
    React.js

## Getting Started

To get started with the project, follow these steps:

    Clone the repository to your local machine.
    Install the dependencies using npm install.
    Set up a PostgreSQL database.
    Set up a Redis and run the server.
    Run the database migrations using npm run migrate:up.
    Start the backend server using npm start.
    Start the frontend server using npm run dev
    Navigate to http://localhost:5173 in your web browser.

[Redis Quick start](https://redis.io/docs/getting-started/)

## Usage

To use the parcel delivery service, follow these steps:

    As a sender, navigate to the home page and click on the "Dashboard" button.
    Enter the pick-up and drop-off address in the text fields and click on the "Add Parcel" button.
    As a biker, navigate to the home page and click on the "Parcels" button.
    You will be redirected to a page that shows a list of parcels that need to be delivered.
    Click on the "Pick up" button next to a parcel to pick it up.
    The status of the parcel will be updated for the sender.

Conclusion

This project provides a simple implementation of a parcel delivery service that can be used by a private delivery company in Cologne. It demonstrates the use of Node.js, Express.js, PostgreSQL, and React.js to build a web application that provides features for sending and delivering parcels.

## Dependencies

- Node v14.15.1 (LTS) or more recent. While older versions can work it is advisable to keep node to latest LTS version

- npm 6.14.8 (LTS) or more recent, Yarn can work but was not tested for this project

## Code Styles

This project uses `eslint` and `prettier`. all configurations for this project inside `package.json` file.

## Installation

### Database setup

**[1]** Open postgres terminal with: `psql postgres`

1- `CREATE DATABASE delivery_service;`

2- `CREATE ROLE admin WITH PASSWORD 'admin';`

3- `ALTER ROLE admin WITH SUPERUSER CREATEROLE CREATEDB LOGIN;`

4- `GRANT ALL PRIVILEGES ON DATABASE delivery_service TO admin;`

**[2]** Second to install the node_modules run `npm install` or `yarn install`. After installation is done
migrate up the database table schema with `npm run migrate:up` or `yarn migrate:up`
or run the `script.sh` in `sql` folder from root directory with `./script.sh`
after that start the api in dev mode with `npm run dev` or `yarn dev`.

## Available Scripts

In the project directory, you can run:

##### `npm run dev` or `yarn dev`

Runs the app in the development mode.
The page will reload automatically if you make edits.

##### `npm run format` or `yarn format`

Will format by prettier and will also see if any lint errors in the console.

##### `npm run test` or `yarn test`

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

##### `npm run build` or `yarn build`

Builds the app for production to the dist folder.
It's format TypeScript to JavaScript

##### `npm run start` or `yarn start`

Build and runs the app in the clients mode.
Open <http://localhost:3000/> to view it in the browser.

##### `npm run migrate:up` or `yarn migrate:up`

Migrate up the database tables

##### `npm run migrate:down` or `yarn migrate:down`

Migrate up the database tables

## Built With

- [Node](https://nodejs.org) - Javascript runtime
- [Express](https://expressjs.com/) - Javascript API framework
- [PostgreSQL](https://www.postgresql.org/) - Open source Relational Database
- [Redis](https://redis.io/) - Open source in-memory data store.
- [Jasmine](https://jasmine.github.io/) - Testing library
- [JWT](https://jwt.io/) - JSON Web Token for generates access and refresh tokens
