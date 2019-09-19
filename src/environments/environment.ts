// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/************* Local ********************/
export const environment = {
  production: false,
  apiEndpoint: 'http://192.168.24.208/ionic-api/api/',
  imageURL: 'http://192.168.24.208/ionic-api/media/'
};

/************* Staging ********************/
// export const environment = {
//   production: true,
//   apiEndpoint: 'http://166.62.54.122/ionic-api/api/',
//   imageURL: 'http://166.62.54.122/ionic-api/media/'
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
