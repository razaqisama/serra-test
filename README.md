# Serra Test

## Description

A project to fulfill the take-home test for a backend engineer at Sera.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Development](#development)

## Installation

To install the necessary dependencies, run:

```bash 
  npm install
``` 

## Script
The following scripts are available for use:
- `build` : Generates API documentation and compiles TypeScript files.
- `test` : Runs tests using Mocha and TypeScript.
- `test:coverage` : Runs tests with coverage reporting.
- `start:prod` : Builds the application, copies environment variables, and starts the production server.
- `start:prod-consumer` : Starts the RabbitMQ consumer in production.
- `start` : Generates API documentation and starts the application in development mode.
- `dev` : Runs the application in development mode with nodemon for automatic restarts.
- `api-docs:generate` : Generates API documentation using a custom script.
- `db:generate-migration` : Generates a new database migration.
- `db:migrate` : Runs pending database migrations.
- `rabbitmq:consumer` : Starts the RabbitMQ consumer.

## Development

1. Make sure env is filled correctly.
2. To start the app in development, run:
```bash 
  npm run dev
``` 
3. To start the rabbitmq consumer app, run:
```bash 
  npm run rabbitmq:consumer
``` 
4. Server will be running on: `localhost:PORT`
5. API docs will be running on: `localhost:PORT/api-docs`