import type {ReactNode} from "react";
import {Provider as ReactReduxProvider} from "react-redux";
import {useAsync} from "react-async-hook";
import {createStore} from "core";
import memoize from "memoizee";
import {id} from "tsafe/id";
import type {
    OidcClientConfig,
    UserApiClientConfig
} from "core/setup";
import {assert} from "tsafe/assert";
import {getEnv} from "env";

//NOTE: Create store can only be called once
const createStore_memo = memoize(
    () => {
        const env = getEnv();
        if (env.OIDC_URL !== "") {
            assert(env.OIDC_REALM !== "", "You must provide an OIDC realm");
        }

        return createStore({
            "oidcClientConfig": id<OidcClientConfig.Keycloak>({
                "implementation": "KEYCLOAK",
                "url": env.OIDC_URL,
                "realm": env.OIDC_REALM,
                "clientId": env.OIDC_CLIENT_ID,
            }),
            "userApiClientConfig":
               id<UserApiClientConfig.Jwt>({
                        "implementation": "JWT",
                        "oidcClaims": {
                            "email": env.OIDC_EMAIL_CLAIM,
                            "familyName": env.OIDC_FAMILY_NAME_CLAIM,
                            "firstName": env.OIDC_FIRST_NAME_CLAIM,
                            "username": env.OIDC_USERNAME_CLAIM,
                            "groups": env.OIDC_GROUPS_CLAIM,
                            "local": env.OIDC_LOCALE_CLAIM,
                        },
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
