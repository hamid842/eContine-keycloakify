/* eslint-disable react-hooks/rules-of-hooks */
import type {Action, ThunkAction as GenericThunkAction} from "@reduxjs/toolkit";
import {configureStore} from "@reduxjs/toolkit";
import {createJwtUserApiClient} from "./secondaryAdapters/jwtUserApiClient";
import * as userAuthenticationUseCase from "./usecases/userAuthentication";
import type {UserApiClient} from "./ports/UserApiClient";
import type {ReturnType} from "tsafe/ReturnType";
import {Deferred} from "evt/tools/Deferred";
import {createObjectThatThrowsIfAccessed} from "./tools/createObjectThatThrowsIfAccessed";
import {createKeycloakOidcClient} from "./secondaryAdapters/keycloakOidcClient";
import type {OidcClient} from "./ports/OidcClient";
import type {Param0, Equals} from "tsafe";
import {assert} from "tsafe/assert";
import {id} from "tsafe/id";
import {usecasesToReducer} from "clean-redux";
import {createMiddlewareEvtActionFactory} from 'clean-redux/middlewareEvtAction'

/* ---------- Legacy ---------- */
import * as app from "js/redux/app";

export type CreateStoreParams = {
    oidcClientConfig: OidcClientConfig;
    userApiClientConfig: UserApiClientConfig;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UserApiClientConfig = UserApiClientConfig.Jwt;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export declare namespace UserApiClientConfig {
    export type Jwt = {
        implementation: "JWT";
    } & Omit<Param0<typeof createJwtUserApiClient>, "getIp" | "getOidcAccessToken">;
}

// All these assert<Equals<...>> are just here to help visualize what the type
// actually is. It's hard to tell just by looking at the definition
// with all these Omit, Pick Param0<typeof ...>.
// It could have been just a comment but comment lies. Instead here
// we are forced, if we update the types, to update the asserts statement
// or else we get red squiggly lines.
assert<Equals<UserApiClientConfig,
    | {
    implementation: "JWT";
    oidcClaims: {
        email: string;
        familyName: string;
        firstName: string;
        username: string;
        groups: string;
        local: string;
    }}>>();


export declare type OidcClientConfig = OidcClientConfig.Keycloak;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export declare namespace OidcClientConfig {
    export type Keycloak = {
        implementation: "KEYCLOAK";
    } & Param0<typeof createKeycloakOidcClient>;
}

assert<Equals<OidcClientConfig,
    | {
    implementation: "KEYCLOAK";
    url: string;
    realm: string;
    clientId: string;
}>>();


export const usecases = [
    app,
    userAuthenticationUseCase,
];

const {createMiddlewareEvtAction} = createMiddlewareEvtActionFactory(usecases);

export type ThunksExtraArgument = {
    createStoreParams: CreateStoreParams;
    userApiClient: UserApiClient;
    oidcClient: OidcClient;
    evtAction: ReturnType<typeof createMiddlewareEvtAction>["evtAction"];
};

createStore.isFirstInvocation = true;

export async function createStore(params: CreateStoreParams) {
    assert(
        createStore.isFirstInvocation,
        "createStore has already been called, " +
        "only one instance of the store is supposed to" +
        "be created",
    );

    createStore.isFirstInvocation = false;

    const {oidcClientConfig} = params;

    const oidcClient = await (() => {
        switch (oidcClientConfig.implementation) {
            case "KEYCLOAK":
                return createKeycloakOidcClient(oidcClientConfig);
        }
    })();

    dOidcClient.resolve(oidcClient);


    const userApiClient = oidcClient.isUserLoggedIn
        ? createJwtUserApiClient({
            // @ts-ignore
            "oidcClaims": (() => {
                const {userApiClientConfig} = params;

                switch (userApiClientConfig.implementation) {
                    case "JWT":
                        return userApiClientConfig.oidcClaims;

                }
            })(),
            "getOidcAccessToken": oidcClient.getAccessToken,
        })
        : createObjectThatThrowsIfAccessed<UserApiClient>();


    const { evtAction,middlewareEvtAction} = createMiddlewareEvtAction();

    const store = configureStore({
        "reducer": usecasesToReducer(usecases),
        "middleware": getDefaultMiddleware =>
            [
                ...getDefaultMiddleware({
                    "thunk": {
                        "extraArgument": id<ThunksExtraArgument>({
                            "createStoreParams": params,
                            oidcClient,
                            userApiClient,
                            evtAction,
                        }),
                    },
                }),
                middlewareEvtAction,
            ] as const,
    });

    dStoreInstance.resolve(store);

    await store.dispatch(userAuthenticationUseCase.privateThunks.initialize());


    return store;
}

export type Store = ReturnType<typeof createStore>;

export type RootState = ReturnType<Store["getState"]>;

export type Dispatch = Store["dispatch"];

export type ThunkAction<ReturnType = Promise<void>> = GenericThunkAction<ReturnType,
    RootState,
    ThunksExtraArgument,
    Action<string>>;

const dStoreInstance = new Deferred<Store>();

/**
 * A promise that resolve to the store instance.
 * If createStore isn't called it's pending forever.
 *
 * @deprecated: use "js/react/hooks" to interact with the store.
 */
export const {pr: prStore} = dStoreInstance;

const dOidcClient = new Deferred<OidcClient>();

/** @deprecated */
export const {pr: prOidcClient} = dOidcClient;
