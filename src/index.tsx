import {render} from "react-dom";
import "./index.scss";
import {App} from "./App";
import {
    getKcContext,
} from "keycloakify";

import "./kcMessagesExtension"
import KcApp from "./ui/components/KcApp/KcApp";
import {I18nProvider} from "i18n/I18nProvider";


const {kcContext} = getKcContext({
    /* Uncomment to test th<e login page for development */
    // "mockPageId": "login.ftl",
    // "mockPageId": "register-user-profile.ftl",
});

render(
    kcContext === undefined ?
        <App/> :
        <I18nProvider><KcApp kcContext={kcContext}/></I18nProvider>
    ,
    document.getElementById("root")
);
