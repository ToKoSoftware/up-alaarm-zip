# Alaarm

This is a research project by Students of the [Chair of Business Informatics, Processes and Systems](https://lswi.de/)
 at [University of Potsdam](https://uni-potsdam.de). 

## Introduction to Alaarm

TBD

## Project structure

This project is a monorepo. It contains the following packages:
- [scenario-admin](./packages/scenario-admin/README.md)
  - Contains the code for the admin which is responsible for the creation and management of scenarios
- [scenario-client](./packages/scenario-client/README.md)
  - Contains the code for the client which is handles the scenario's attendee's inputs 
- [scenario-controller](./packages/scenario-controller/README.md)
  - Contains the code for the main controller which is responsible for the communication between the admin, client, and the local mqtt cloud 
- [scenario-shared](./packages/scenario-shared/README.md)
  - Contains shared code and typescript typings between the packages 

## Installation 

Run the following command to install all dependencies of all packages:
```bash
npm i
```

## Running the project

## Development
This project uses [lerna](https://lerna.js.org/) to manage the monorepo.
