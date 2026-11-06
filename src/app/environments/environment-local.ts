import { EnvironmentModel } from "./environment-model";

export const environment: EnvironmentModel = {
    name: 'local',
    apiUrl: 'http://localhost:6001',
    keycloak: {
        url: 'http://localhost:8080',
        realm: 'MusicSpaceWeb',
        clientId: 'music-space-keycloak-client'
    },
    spotify: {
        apiUrl: 'https://api.spotify.com',
        authUrl: 'https://accounts.spotify.com/api/token',
        clientId: '6016042a782f401fba95f2408b717781',
        clientSecret: 'cb7bf58034914f3c8e21b95bbb53f6c0'
    }
};
