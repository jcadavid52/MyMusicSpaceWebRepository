export interface SessionModel {
    user: UserModel;
    accessToken: string;
    refreshToken: string;
    expirationAccessToken: Date;
    expirationRefreshToken: Date;
}

export interface UserModel {
    id: string;
    name: string;
    username: string;
   // phone: string;
    email: string;
   // role: string;
}