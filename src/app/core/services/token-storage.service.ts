import { Injectable } from '@angular/core';

const TOKEN_KEY = '_token';
const USER_KEY = 'currentUser';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    constructor() { }

    public signOut(): void {
        window.localStorage.clear();
    }

    public saveToken(token: string): void {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, token);
    }

    get getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    public saveUser(user: any): void {
        window.localStorage.removeItem(USER_KEY);
        window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    get getUser(): any {
        const user = window.localStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }
        return {};
    }
}
