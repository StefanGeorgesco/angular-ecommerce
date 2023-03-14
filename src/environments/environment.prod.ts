export const environment = {
  production: true,
  appBaseHref: "/ecommerce",
  apiUrl: "https://localhost:8443/api",
  stripePublishableKey: "pk_test_51MXSanLsBN26ixlyGVKf1uAqG4zfq4XEsuUD7fGmK7dGCZZUjvuqvSG9YSeQ89VCvg8wFUQbKObf1LfiJmTiXdKw00l9Isi6qO",
  currency: "EUR",
  currencyMultiplicator: 100,
  oidc: {
    clientId: "0oa84cagnlAl8vrcj5d7",
    issuer: "https://dev-27848643.okta.com/oauth2/default",
    redirectUri: "http://localhost/ecommerce/login/callback",
    scopes: ['openid', 'profile', 'email']
  },
  postLogoutRedirectUri: "http://localhost/ecommerce"
};
