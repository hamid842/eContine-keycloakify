import Keycloak from 'keycloak-js'

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
    url: 'http://207.154.209.192:8080/auth',
    realm: 'eContine',
    clientId: 'e-contine',
})

export default keycloak
