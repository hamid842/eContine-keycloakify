import type {ReactNode} from "react";
import {Provider as ReactReduxProvider} from "react-redux";
import {useAsync} from "react-async-hook";
import {createStore} from "core";
import memoize from "memoizee";
import {id} from "tsafe/id";
import type {
    OidcClientConfig,
} from "core/setup";
import {assert} from "tsafe/assert";

//NOTE: Create store can only be called once
const createStore_memo = memoize(
    () => {

        if (process.env.OIDC_URL !== "") {
            assert(process.env.OIDC_REALM !== "", "You must provide an OIDC realm");
        }

        return createStore({
            "oidcClientConfig": id<OidcClientConfig.Keycloak>({
                "implementation": "KEYCLOAK",
                // @ts-ignore
                "url": process.env.OIDC_URL,
                // @ts-ignore
                "realm": process.env.OIDC_REALM,
                // @ts-ignore
                "clientId": process.env.OIDC_CLIENT_ID,
            }),

        });
    },
    {"promise": true},
);

type Props = {
    children: ReactNode;
};

export function LibProvider(props: Props) {
    const {children} = props;

    const asyncCreateStore = useAsync(() => createStore_memo(), []);

    if (asyncCreateStore.error) {
        throw asyncCreateStore.error;
    }

    const {result: store} = asyncCreateStore;

    return store === undefined ? null : (
        <ReactReduxProvider store={store}>{children}</ReactReduxProvider>
    );
}
