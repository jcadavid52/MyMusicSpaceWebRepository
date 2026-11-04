export interface KeycloakConfigure {
    url: string;
    realm: string;
    clientId: string;
}

export interface EnvironmentModel {
    keycloak: KeycloakConfigure;
    spotify: SpotifyConfigure;
    name: string;
    apiUrl: string;
}

interface SpotifyConfigure {
    apiUrl: string;
    authUrl: string;
    clientId: string;
    clientSecret: string;
}
