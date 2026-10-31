import { EnvironmentModel } from "./environment-model";

export const environment: EnvironmentModel = {
    name: 'local',
    apiUrl: 'http://localhost:6001',
    keycloak: {
        url: 'http://localhost:8080',
        realm: 'MiApp-Realm',
        clientId: 'dotnet-api'
    }
}