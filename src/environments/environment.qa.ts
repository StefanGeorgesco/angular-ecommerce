// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appBaseHref: "/",
  apiUrl: "https://localhost:9898/api",
  stripePublishableKey: "pk_test_51MXSanLsBN26ixlyGVKf1uAqG4zfq4XEsuUD7fGmK7dGCZZUjvuqvSG9YSeQ89VCvg8wFUQbKObf1LfiJmTiXdKw00l9Isi6qO",
  currency: "EUR",
  currencyMultiplicator: 100,
  oidc: {
    clientId: "0oa84cagnlAl8vrcj5d7",
    issuer: "https://dev-27848643.okta.com/oauth2/default",
    redirectUri: "http://localhost/login/callback",
    scopes: ['openid', 'profile', 'email']
  },
  postLogoutRedirectUri: "http://localhost"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
