# packages-ui
Simple UI for interacting with the packages-api REST service

## Overview
An Angular 7 'Proof of Concept' UI built with Semantic UI framework to interact with the packages-api REST service. The UI is fully responsive. 

This uses: 
  - Get Package
  - Get Packages
  - Create Package
  - Update Package
  - Delete Package
  - Get Currencies

As part of the startup a Node server is also launched to redirect requests for CORS compatibility. 

## Deployment

The UI requires NPM, Angular CLI, and Node installed.

A `username` and `password` is required for the Product API. It is best configured as part of the development environments/environment.ts file. 

### Run in NPM
1. Add `productAPIUsername` and `productAPIPassword` in `src/environments/environment.ts`
2. Build using `npm install`
3. Launch using `npm run dev`

Once deployed the UI can be found at: **http://www.localhost:4200**

## Tests

Unfortunately there is no test coverage as this is a quick PoC of a front end UI.
