# Alaarm

This is a research project by Students of the [Chair of Business Informatics, Processes and Systems](https://lswi.de/)
 at [University of Potsdam](https://uni-potsdam.de). 

## Introduction to Alaarm

TBD

## Project structure

This project is a monorepo. It contains the following packages:
- [scenario-admin](./packages/scenario-admin/README.md)
  - Contains the code for the admin which is responsible for the creation and management of scenarios
  - The admin has been deployed to [https://admin.alaarm.cloud/](https://admin.alaarm.cloud)
- [scenario-client](./packages/scenario-client/README.md)
  - Contains the code for the client which is handles the scenario's attendee's inputs 
  - The client has been deployed to [https://client.alaarm.cloud/](https://client.alaarm.cloud)
- [scenario-controller](./packages/scenario-controller/README.md)
  - Contains the code for the main controller which is responsible for the communication between the admin, client, and the local mqtt cloud 
- [scenario-shared](./packages/scenario-shared/README.md)
  - Contains shared code and typescript typings between the packages 

## Installation 
This project uses [lerna](https://lerna.js.org/) to manage the monorepo.
[Husky](https://typicode.github.io/husky/#/) is used to run linting before commits.

Run the following command to install all dependencies of all packages:
```bash
npm i
```

## Building the project

```bash
npm run build
```

## Running the project

This command will start the admin, client, and controller in parallel in development mode.
```bash
npm run dev
```

To run just one of the packages, use the following command:
```bash
npx lerna run dev --scope=@alaarm/scenario-admin
```
