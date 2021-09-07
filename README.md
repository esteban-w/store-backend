# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. This is much like a document you might come across in real life when building or extending an API. 

Your first task is to read the requirements and update the document with the following:
- Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    
**Example**: A SHOW route: 'blogs/:id' [GET] 

- Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.   
**Example**: You can format this however you like but these types of information should be provided
Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

**NOTE** It is important to remember that there might not be a one to one ratio between data shapes and database tables. Data shapes only outline the structure of objects being passed between frontend and API, the database may need multiple tables to store a single shape. 

### 2.  DB Creation and Migrations

Now that you have the structure of the databse outlined, it is time to create the database and migrations. Add the npm packages dotenv and db-migrate that we used in the course and setup your Postgres database. If you get stuck, you can always revisit the database lesson for a reminder. 

You must also ensure that any sensitive information is hashed with bcrypt. If any passwords are found in plain text in your application it will not pass.

### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!

## Dependencies
- Node >= version 12
- Docker

## Setting up
- Install all required dependencies by running: `npm install` from the project's root folder.
- Before running postgres using docker, you need to create a `.env` file and include at least `POSTGRES_PASSWORD` with a value, e.g.
`POSTGRES_PASSWORD=pass123` if you don't include any other value, both your database user and database name will be set to `postgres`,
to specifically set a database user and database name you need to include `POSTGRES_USER` and `POSTGRES_DB` values, 
e.g. `POSTGRES_USER=store_admin` `POSTGRES_DB=store_dev`
  A `.env.sample` file is provided in this repository, to use all variables defined in that file required for several values across 
  the application (including postgres variables), rename this file to `.env` .
- After creating `.env` and including your variables (or using values provided from `.env.sample`), you can spin up your 
  docker container by running: `docker-compose up` from the project's root folder.
- To create necessary database tables run: `db-migrate up` from the project's root folder.
- Having your docker container running, start the application by running: `npm run watch` from the project's root folder.

## Usage
- Create user and **store token returned**
  ```
  POST http://localhost:3000/users
  Content-Type: application/json
  {
    "email": "user@test.com",
    "password": "pass123"
  }
  ```
- Provide token in GET request for user index endpoint
  ```
  GET http://localhost:3000/users
  Accept: application/json
  Authorization: Bearer <returned token from user creation request>
  ```
- Provide token in GET request for user show endpoint
  ```
  GET http://localhost:3000/users/1
  Accept: application/json
  Authorization: Bearer <returned token from user creation request>
  ```
- Provide token in POST request for product create endpoint
  ```
  POST http://localhost:3000/products
  Content-Type: application/json
  Authorization: Bearer <returned token from user creation request>
  
  {
    "name": "product test 1",
    "price": 2345
  }
  ```
- GET request for product index endpoint
  ```
  GET http://localhost:3000/products
  Accept: application/json
  ```
- GET request for product show endpoint
  ```
  GET http://localhost:3000/products/1
  Accept: application/json
  ```
- Provide token in POST request for order create endpoint
  ```
  POST http://localhost:3000/orders
  Content-Type: application/json
  Authorization: Bearer <returned token from user creation request>
  
  {
    "status": "active",
    "user_id": 1
  }
  ```
- Provide token in GET request for current (latest active) order by user id endpoint
  ```
  GET http://localhost:3000/users/1/order
  Accept: application/json
  Authorization: Bearer <returned token from user creation request>
  ```

## Running tests
- For running tests, it's necessary to set up an independent database.
    with your docker container running, ssh into your postgres instance:
    ```
    docker-compose exec postgres /bin/bash
    ```
    
    open psql using your created user (if you specified `POSTGRES_USER` use that value, else use `postgres` as user)
    ```
    psql postgres --user <specify your created user>
    ```
    
    create your test db
    ```
    create database <name of your test db>;
    ```

    list databases to confirm your test db was created
    ```
    \l
    ```
    
    exit psql
    ```
    \q
    ```
    
    exit ssh
    ```
    exit
    ```