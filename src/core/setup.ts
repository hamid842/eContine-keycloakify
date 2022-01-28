/* eslint-disable react-hooks/rules-of-hooks */
import type { Action, ThunkAction as GenericThunkAction } from "@reduxjs/toolkit";
import type { ReturnType } from "tsafe/ReturnType";
import { configureStore } from "@reduxjs/toolkit";
import { Deferred } from "evt/tools/Deferred";
import { createKeycloakOidcClient } from "./secondaryAdapters/keycloakOidcClient";
import {createMiddlewareEvtActionFactory} from "clean-redux/middlewareEvtAction";
import type { Param0, Equals } from "tsafe";
import { assert } from "tsafe/assert";
import { id } from "tsafe/id";
import { usecasesToReducer } from "clean-redux";

import type { OidcClient } from "./ports/OidcClient";


/* ---------- Legacy ---------- */
import * as app from "js/redux/app";

export type CreateStoreParams = {
    oidcClientConfig: OidcClientConfig;
};


export declare type OidcClientConfig = OidcClientConfig.Keycloak;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export declare namespace OidcClientConfig {
    export type Keycloak = {
        implementation: "KEYCLOAK";
    } & Param0<typeof createKeycloakOidcClient>;
}

assert<
    Equals<
        OidcClientConfig,
         {
              implementation: "KEYCLOAK";
              url: string;
              realm: string;
              clientId: string;
          }
    >
>();

export const usecases = [
    app,
];

const { createMiddlewareEvtAction } = createMiddlewareEvtActionFactory(usecases);

export type ThunksExtraArgument = {
    createStoreParams: CreateStoreParams;
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

    const { oidcClientConfig } = params;

    const oidcClient = await (() => {
        switch (oidcClientConfig.implementation) {
            case "KEYCLOAK":
                return createKeycloakOidcClient(oidcClientConfig);
        }
    })();

    dOidcClient.resolve(oidcClient);

    const { evtAction, middlewareEvtAction } = createMiddlewareEvtAction();

    const store = configureStore({
        "reducer": usecasesToReducer(usecases),
        "middleware": getDefaultMiddleware =>
            [
                ...getDefaultMiddleware({
                    "thunk": {
                        "extraArgument": id<ThunksExtraArgument>({
                            "createStoreParams": params,
                            evtAction
                        }),
                    },
                }),
                middlewareEvtAction,
            ] as const,
    });

    dStoreInstance.resolve(store);




    return store;
}

export type Store = ReturnType<typeof createStore>;

export type RootState = ReturnType<Store["getState"]>;

export type Dispatch = Store["dispatch"];

export type ThunkAction<ReturnType = Promise<void>> = GenericThunkAction<
    ReturnType,
    RootState,
    ThunksExtraArgument,
    Action<string>
>;

const dStoreInstance = new Deferred<Store>();

/**
 * A promise that resolve to the store instance.
 * If createStore isn't called it's pending forever.
 *
 * @deprecated: use "js/react/hooks" to interact with the store.
 */
export const { pr: prStore } = dStoreInstance;

const dOidcClient = new Deferred<OidcClient>();

/** @deprecated */
export const { pr: prOidcClient } = dOidcClient;
