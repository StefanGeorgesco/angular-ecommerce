const baseUrl = "/angular-ecommerce";

export const environment = {
  production: true,
  appBaseHref: baseUrl,
  apiUrl: "https://stefan-georgesco.hd.free.fr/ecommerce-api",
  stripePublishableKey: "pk_test_51MXSanLsBN26ixlyGVKf1uAqG4zfq4XEsuUD7fGmK7dGCZZUjvuqvSG9YSeQ89VCvg8wFUQbKObf1LfiJmTiXdKw00l9Isi6qO",
  currency: "EUR",
  currencyMultiplicator: 100,
  oidc: {
    clientId: "0oa84cagnlAl8vrcj5d7",
    issuer: "https://dev-27848643.okta.com/oauth2/default",
    redirectUri: window.location.origin + baseUrl + "/login/callback",
    scopes: ['openid', 'profile', 'email']
  },
  postLogoutRedirectUri: window.location.origin + baseUrl
};
