import {useTranslation} from 'i18n/useTranslations'
import {Button} from "@mui/material";

interface Props {
    keycloak: Object;
}

export const Dashboard = (props: Props) => {
    const {t} = useTranslation({Dashboard})

    return (
        <div>
            <h1>{t("doRegister")}</h1>
            <Button variant={'outlined'} onClick={() => props.keycloak.login()}>Login</Button>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export declare namespace Dashboard {
    export type I18nScheme = {
        "doRegister": undefined;
    };
}
