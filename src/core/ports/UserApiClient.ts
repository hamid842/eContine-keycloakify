import type { KcLanguageTag } from "keycloakify";

export type User = {
    email: string;
    familyName: string;
    firstName: string;
    username: string;
    groups: string[];
    local: KcLanguageTag;
};

export type UserApiClient = {
    getUser: () => Promise<User>;
};
