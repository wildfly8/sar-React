require('dotenv').config();

export default {
  oidc: {
    clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
    issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`,
    redirectUri: `${window.location.origin}/implicit/callback`,
    responseType: ['token', 'id_token'],
    scopes: ['openid', 'profile', 'email', 'address', 'phone'],
    pkce: false,
    disableHttpsCheck: false,
    idps: [
      {type: 'Facebook', id: process.env.REACT_APP_IDP_ID_FB}
      ],
    idpDisplay: "PRIMARY",
  },
  resourceServer: {
    roomsUrl: `${process.env.REACT_APP_EXPRESS_NODE_SERVER_ENDPOINT}/api/chat`,
  },
};
