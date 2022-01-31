import {Button} from "@mui/material";

import {useTranslation} from 'i18n/useTranslations'
import {useThunks} from "ui/coreApi";


export const Dashboard = () => {
    const {t} = useTranslation({Dashboard})
    const {userAuthenticationThunks} = useThunks();
    const isUserLoggedIn = userAuthenticationThunks.getIsUserLoggedIn();
console.log(isUserLoggedIn)
    return (
        <div>
            <h1>{t("doRegister")}</h1>
            {!isUserLoggedIn ? (
                <Button component={'button'} variant={'outlined'}
                    // @ts-ignore
                        onClick={userAuthenticationThunks.login}>
                    {t("login")}
                </Button>
            ) : (
                <a href="https://localhost:3000">{t("new user")}</a>
            )}
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export declare namespace Dashboard {
    export type I18nScheme = {
        "doRegister": undefined;
        "new user": undefined;
        "login": undefined;
    };
}
