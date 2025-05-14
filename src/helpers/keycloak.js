import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEY_CLOCK_URL,
  realm: import.meta.env.VITE_KEY_CLOCK_REALM,
  clientId: import.meta.env.VITE_KEY_CLOCK_CLIENT,
});

export default keycloak;
