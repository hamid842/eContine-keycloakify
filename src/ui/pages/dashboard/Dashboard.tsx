import {useTranslation} from 'i18n/useTranslations'

export const Dashboard = () => {
    const {t} = useTranslation({Dashboard})
    console.log()
    return (
        <div><h1>{t("doRegister")}</h1></div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export declare namespace Dashboard {
    export type I18nScheme = {
        "doRegister": undefined;
    };
}
