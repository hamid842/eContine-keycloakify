import {useKeycloak} from "@react-keycloak/web";
import {Button} from "@mui/material";

import {useTranslation} from 'i18n/useTranslations'
// interface Props {
//     keycloak: {
//         login: any
//     };
// }

export const Dashboard = () => {
    const {t} = useTranslation({Dashboard})
    const {keycloak} = useKeycloak()

    return (
        <div>
            <h1>{t("doRegister")}</h1>
            <Button variant={'outlined'} onClick={() => keycloak.login()}>Login</Button>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export declare namespace Dashboard {
    export type I18nScheme = {
        "doRegister": undefined;
    };
}
