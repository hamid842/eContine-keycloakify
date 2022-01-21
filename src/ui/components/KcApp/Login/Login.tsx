import {memo} from "react";
import type { KcProps } from "keycloakify/lib/components/KcProps";
import { useKcMessage } from "keycloakify/lib/i18n/useKcMessage";

import {KcContext} from "../kcContext";


type KcContext_Login = Extract<KcContext, { pageId: "login.ftl" }>;

export const Login = memo(
    ({ kcContext, ...props }: { kcContext: KcContext_Login } & KcProps) => {
        const {msg, msgStr} = useKcMessage();

        const {
            social,
            realm,
            url,
            usernameEditDisabled,
            login,
            auth,
            registrationDisabled,
        } = kcContext;

        return (
            <>New Login Page</>
        )

    }
)
