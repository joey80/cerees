# Cerees

v0.3.0

<!-- ![photos](https://gitlab.com/jobtarget/platform/platformorders/uploads/76ee3948aea5698fccad1a0328d92a85/Screen_Shot_2023-03-06_at_9.54.48_AM.png) -->

<!-- | Environment | URL                                                                                      |
| :---------- | :--------------------------------------------------------------------------------------- |
| QA          | [https://qa-platformsettings.jobtarget.com](https://qa-platformsettings.jobtarget.com)   |
| UAT         | [https://uat-platformsettings.jobtarget.com](https://uat-platformsettings.jobtarget.com) |
| Production  | [https://platformsettings.jobtarget.com](https://platformsettings.jobtarget.com)         |
| Logging     | [Datadog RUM](https://tinyurl.com/settings-dd-rum)                                       |
| Logging     | [Datadog Trace](https://tinyurl.com/settings-dd-trace)                                   | -->

## Getting Started

### Install and Setup

### How To Run

#### Localhost

Once the project has been installed and the `.env` file has been created and populated, type `npm run start` in the terminal to launch the app in the browser.

#### Docker

To create a container for this repo use this command `npm run build:docker` in the terminal and a docker image will be created.

### Running The Unit Tests

This project uses React Testing Library for the unit tests for the components and also for the custom hooks. It uses Jest for the utility function tests. To run the units tests type `npm run test` in the terminal.

## About The App

### Node

This project uses Node 18. This is set in the `.npmrc` file to ensure packages are installed with that version and also in the `Dockerfile` it uses the `node:18-alpine` image.

### Stack
