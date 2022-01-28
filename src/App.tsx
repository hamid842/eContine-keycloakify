// import {ReactKeycloakProvider} from '@react-keycloak/web'
import AppRoutes from 'ui/routes/AppRoutes'
import {I18nProvider} from 'i18n/I18nProvider'


// import keycloak from './keycloak'
import LocaleButton from "./ui/components/shared/LocaleButton";
import {LibProvider} from 'ui/coreApi/LibProvider'

export function App() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <LibProvider>
                <I18nProvider>
                    <LocaleButton/>
                    <AppRoutes/>
                </I18nProvider>
            </LibProvider>
        </div>
    );
}

export declare namespace App {
    export type I18nScheme = Record<| "file", undefined>;
}

