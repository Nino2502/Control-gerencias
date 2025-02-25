// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  youtubeApiKey: 'AIzaSyCVBVhXksOgygO6VzsqKNEV5Ro4U-KXP84',
  firebaseConfig: {
    apiKey: "AIzaSyC1CAYnx3N28PFPjsJsymhy_KjZTuadPNk",
    authDomain: "control-gerencias-app.firebaseapp.com",
    projectId: "control-gerencias-app",
    storageBucket: "control-gerencias-app.appspot.com",  // 🔹 Cambié esto
    messagingSenderId: "342286017460",
    appId: "1:342286017460:web:774de5bbc0227e75b388e1",
    measurementId: "G-HJL396REGV"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
