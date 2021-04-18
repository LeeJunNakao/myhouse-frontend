export interface LoginRequest {
    email: string,
    password: string,
}

export interface TokenResponse {
    token: string,
}

export interface TokenRequest {
    token: string,
}

export interface RegisterRequest {
    name: string,
    email: string,
    password: string,
}

export interface UserInfo {
    id: number,
    name: string,
    email: string,
}
