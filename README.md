# Store Backend Project

## Dependencies
- Node >= version 12
- Docker

## Setting up
- Install all required dependencies by running: `npm install` from the project's root folder.
- Before running postgres using docker, you need to create a `.env` file and include at least `POSTGRES_PASSWORD` with a value, e.g.
`POSTGRES_PASSWORD=pass123`. 
  
  If you don't include any other value, both your database user and database name will be set to `postgres`,
to specifically set a database user and database name you need to include `POSTGRES_USER` and `POSTGRES_DB` values, 
e.g. `POSTGRES_USER=store_admin` `POSTGRES_DB=store_dev`.

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