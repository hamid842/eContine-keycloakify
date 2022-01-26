import AppRoutes from 'ui/routes/AppRoutes'
import {I18nProvider} from 'i18n/I18nProvider'

import LocaleButton from "./ui/components/shared/LocaleButton";

export function App() {

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <I18nProvider>
                <LocaleButton/>
                <AppRoutes/>
            </I18nProvider>
        </div>
    );
}

export declare namespace App {
    export type I18nScheme = Record<| "file", undefined>;
}

