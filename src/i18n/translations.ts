import {symToStr} from "tsafe/symToStr";
import {Reflect} from "tsafe/Reflect";
import {id} from "tsafe/id";
// import { ExplorerButtonBar } from "ui/components/pages/MyFilesMySecrets/Explorer/ExplorerButtonBar";
// import { Explorer } from "ui/components/pages/MyFilesMySecrets/Explorer";
// import { ExplorerItems } from "ui/components/pages/MyFilesMySecrets/Explorer/ExplorerItems";
// import { ExplorerItem } from "ui/components/pages/MyFilesMySecrets/Explorer/ExplorerItems/ExplorerItem";
// import { MySecrets } from "ui/components/pages/MySecrets";
// import { MySecretsEditor } from "ui/components/pages/MySecrets/MySecretsEditor";
// import { MySecretsEditorRow } from "ui/components/pages/MySecrets/MySecretsEditor/MySecretsEditorRow";
// import { Header } from "ui/components/shared/Header";
import {App} from "../App";
// import { FourOhFour } from "ui/components/pages/FourOhFour";
// import { PortraitModeUnsupported } from "ui/components/pages/PortraitModeUnsupported";
// import { Home } from "ui/components/pages/Home";
// import { RegisterUserProfile } from "ui/components/KcApp/RegisterUserProfile";
// import { AccountField } from "ui/components/pages/Account/AccountField";
// import { Account } from "ui/components/pages/Account/Account";
// import { AccountInfoTab } from "ui/components/pages/Account/tabs/AccountInfoTab";
// import { AccountIntegrationsTab } from "ui/components/pages/Account/tabs/AccountIntegrationsTab";
// import { AccountStorageTab } from "ui/components/pages/Account/tabs/AccountStorageTab";
// import { AccountUserInterfaceTab } from "ui/components/pages/Account/tabs/AccountUserInterfaceTab";
// import { CatalogLauncher } from "ui/components/pages/Catalog/CatalogLauncher/CatalogLauncher";
// import { CatalogExplorerCards } from "ui/components/pages/Catalog/CatalogExplorer/CatalogExplorerCards";
// import { CatalogExplorerCard } from "ui/components/pages/Catalog/CatalogExplorer/CatalogExplorerCards/CatalogExplorerCard";
// import { Catalog } from "ui/components/pages/Catalog";
// import { Footer } from "ui/components/App/Footer";
// import { CatalogLauncherMainCard } from "ui/components/pages/Catalog/CatalogLauncher/CatalogLauncherMainCard";
// import { CatalogLauncherConfigurationCard } from "ui/components/pages/Catalog/CatalogLauncher/CatalogLauncherConfigurationCard";
// import { MyServices } from "ui/components/pages/MyServices";
// import { MyServicesButtonBar } from "ui/components/pages/MyServices/MyServicesButtonBar";
// import { MyServicesCard } from "ui/components/pages/MyServices/MyServicesCards/MyServicesCard";
// import { MyServicesRunningTime } from "ui/components/pages/MyServices/MyServicesCards/MyServicesCard/MyServicesRunningTime";
// import { MyServicesSavedConfigOptions } from "ui/components/pages/MyServices/MyServicesSavedConfigs/MyServicesSavedConfig/MyServicesSavedConfigOptions";
// import { MyServicesSavedConfig } from "ui/components/pages/MyServices/MyServicesSavedConfigs/MyServicesSavedConfig";
// import { MyServicesSavedConfigs } from "ui/components/pages/MyServices/MyServicesSavedConfigs";
// import { MyServicesCards } from "ui/components/pages/MyServices/MyServicesCards";
// import { LoginDivider } from "ui/components/KcApp/Login/LoginDivider";
// import { MyFilesMySecrets } from "ui/components/pages/MyFilesMySecrets/MyFilesMySecrets";
import type {KcLanguageTag} from "keycloakify";
import {assert} from "tsafe/assert";
import {Login} from "ui/components/KcApp/Login/Login";
import {Dashboard} from 'ui/pages/dashboard/Dashboard'

export type Scheme = {
    [key: string]: undefined | Record<string, string>;
};

type ToTranslations<S extends Scheme> = {
    [key in keyof S]: string;
};

// prettier-ignore
const reflectedI18nSchemes = {
    // [symToStr({ MySecrets })]: Reflect<MySecrets.I18nScheme>(),
    // [symToStr({ ExplorerButtonBar })]: Reflect<ExplorerButtonBar.I18nScheme>(),
    // [symToStr({ Explorer })]: Reflect<Explorer.I18nScheme>(),
    // [symToStr({ ExplorerItem })]: Reflect<ExplorerItem.I18nScheme>(),
    // [symToStr({ ExplorerItems })]: Reflect<ExplorerItems.I18nScheme>(),
    // [symToStr({ MySecretsEditor })]: Reflect<MySecretsEditor.I18nScheme>(),
    // [symToStr({ MySecretsEditorRow })]: Reflect<MySecretsEditorRow.I18nScheme>(),
    // [symToStr({ MyFilesMySecrets })]: Reflect<MyFilesMySecrets.I18nScheme>(),
    // [symToStr({ Header })]: Reflect<Header.I18nScheme>(),
    [symToStr({App})]: Reflect<App.I18nScheme>(),
    // [symToStr({ PortraitModeUnsupported })]: Reflect<PortraitModeUnsupported.I18nScheme>(),
    // [symToStr({ FourOhFour })]: Reflect<FourOhFour.I18nScheme>(),
    // [symToStr({ Home })]: Reflect<Home.I18nScheme>(),
    // [symToStr({ RegisterUserProfile })]: Reflect<RegisterUserProfile.I18nScheme>(),
    // [symToStr({ AccountField })]: Reflect<AccountField.I18nScheme>(),
    // [symToStr({ Account })]: Reflect<Account.I18nScheme>(),
    // [symToStr({ AccountInfoTab })]: Reflect<AccountInfoTab.I18nScheme>(),
    // [symToStr({ AccountIntegrationsTab })]: Reflect<AccountIntegrationsTab.I18nScheme>(),
    // [symToStr({ AccountStorageTab })]: Reflect<AccountStorageTab.I18nScheme>(),
    // [symToStr({ AccountUserInterfaceTab })]: Reflect<AccountUserInterfaceTab.I18nScheme>(),
    // [symToStr({ CatalogExplorerCard })]: Reflect<CatalogExplorerCard.I18nScheme>(),
    // [symToStr({ CatalogLauncher })]: Reflect<CatalogLauncher.I18nScheme>(),
    // [symToStr({ CatalogExplorerCards })]: Reflect<CatalogExplorerCards.I18nScheme>(),
    // [symToStr({ Catalog })]: Reflect<Catalog.I18nScheme>(),
    // [symToStr({ Footer })]: Reflect<Footer.I18nScheme>(),
    // [symToStr({ CatalogLauncherMainCard })]: Reflect<CatalogLauncherMainCard.I18nScheme>(),
    // [symToStr({ CatalogLauncherConfigurationCard })]: Reflect<CatalogLauncherConfigurationCard.I18nScheme>(),
    // [symToStr({ MyServices })]: Reflect<MyServices.I18nScheme>(),
    // [symToStr({ MyServicesButtonBar })]: Reflect<MyServicesButtonBar.I18nScheme>(),
    // [symToStr({ MyServicesCard })]: Reflect<MyServicesCard.I18nScheme>(),
    // [symToStr({ MyServicesRunningTime })]: Reflect<MyServicesRunningTime.I18nScheme>(),
    // [symToStr({ MyServicesSavedConfigOptions })]: Reflect<MyServicesSavedConfigOptions.I18nScheme>(),
    // [symToStr({ MyServicesSavedConfig })]: Reflect<MyServicesSavedConfig.I18nScheme>(),
    // [symToStr({ MyServicesSavedConfigs })]: Reflect<MyServicesSavedConfigs.I18nScheme>(),
    // [symToStr({ MyServicesCards })]: Reflect<MyServicesCards.I18nScheme>(),
    [symToStr({Dashboard})]: Reflect<Dashboard.I18nScheme>(),
    [symToStr({Login})]: Reflect<Login.I18nScheme>(),
};

export type I18nSchemes = typeof reflectedI18nSchemes;

export type Translations = {
    [K in keyof I18nSchemes]: ToTranslations<I18nSchemes[K]>;
};

export type SupportedLanguage = "en" | "fr" | "de";

assert<SupportedLanguage extends KcLanguageTag ? true : false>();

export const fallbackLanguage = "en";

assert<typeof fallbackLanguage extends SupportedLanguage ? true : false>();

const common = id<Record<SupportedLanguage,
    Record<|"file", string>>>({
    "en": {
        "file": "file",
    },
    "fr": {
        "file": "fichier",
    },
    "de": {
        "file": "fishier",
    }
});

export const resources = id<Record<SupportedLanguage, Translations>>({
    "en": {
        "Dashboard": {
            "doRegister": "English",
            "new user": "New to the datalab?En",
            "login": "Login/En"
        },
        "App": {
            "file": "File",
        },
        "Login": {
            "title": "Login English",
            "doRegister": "Create an account",
        },

    },
    "fr": {
        "Dashboard": {
            "doRegister": "French",
            "new user": "New to the datalab?Fr",
            "login": "Login/Fr"
        },
        "App": {
            "file": "Réduire",
        },
        "Login": {
            ...common.fr,
            "title": "Login French",
            "doRegister": "Créer un compte",

        },
    },
    "de": {
        "Dashboard": {
            "doRegister": "Dutch",
            "new user": "New to the datalab?De",
            "login": "Login/De"
        },
        "App": {
            "file": "Réduire",
        },
        "Login": {
            ...common.de,
            "title": "Login Dutch",
            "doRegister": "Crier un compute",

        },

    }
});
