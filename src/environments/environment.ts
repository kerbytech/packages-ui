// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // long URL as going through CORS node server
  packageAPI: 'http://localhost:8000/http://localhost:8080',

  // long URL as going through CORS node server
  productAPI: 'http://localhost:8000/https://product-service.herokuapp.com/api/v1',
  // SET USERNAME
  productAPIUsername: 'SET_USERNAME',
  // SET PASSWORD
  productAPIPassword: 'SET_PASSWORD',

};
