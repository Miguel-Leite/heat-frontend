

export type TAuthResponse = {
    token: string;
    user: {
        id: string;
        name: string;
        login: string;
        avatar_url: string;
    }
}