// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version: '0.0.0',
    versionDate: '2020-12-11 12:07:13',
  type: 'local',
  app: {
    url: "http://localhost:4200",
    clientAppName: "superjackappcms"
  },
  api:{
    url: "https://localhost:44320"
  },
  superjack:{
    use: false,
    jason:"8080808080808080"
  },
  encryption:{
    key:"8080808080808080"
  },
  oauth:{
    "domain": "dev-febcml-d.eu.auth0.com",
    "clientId": "4JGeXFhWUT9noqmQKjstYAARLA6dlzgS",
    "audience": "https://localhost:44320",
    "apiUri": "https://localhost:44320",
    "appUri": "http://localhost:4200"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
