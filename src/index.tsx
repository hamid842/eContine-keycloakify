// import { useEffect } from "react";
import {render} from "react-dom";
import "./index.scss";
import {App} from "./App";
import {
    // KcApp as KcAppBase,
    // defaultKcProps,
    getKcContext,
    // kcMessages,
    // useKcLanguageTag
} from "keycloakify";
// import { useCssAndCx } from "tss-react";

import "./kcMessagesExtension"
import KcApp from "./ui/components/KcApp/KcApp";
import {I18nProvider} from "i18n/I18nProvider";


const {kcContext} = getKcContext({
    /* Uncomment to test th<e login page for development */
    // "mockPageId": "login.ftl"
});

if (kcContext !== undefined) {
    console.log(kcContext);
}


render(
    kcContext === undefined ?
        <App/> :
        <I18nProvider><KcApp kcContext={kcContext}/></I18nProvider>
    ,
    document.getElementById("root")
);

// function KcApp() {
//
//   if (kcContext === undefined) {
//     throw new Error();
//   }
//
//   const { kcLanguageTag } = useKcLanguageTag();
//
//   const { css } = useCssAndCx();
//
//   //Lazily download the therms and conditions in the appropriate language
//   //if we are on the terms.ftl page.
//   useEffect(
//     () => {
//
//       if (kcContext!.pageId !== "terms.ftl") {
//         return;
//       }
//
//       kcMessages[kcLanguageTag].termsTitle = "";
//
//       fetch((() => {
//         switch (kcLanguageTag) {
//           case "fr": return tos_fr_url;
//           default: return tos_en_url;
//         }
//       })())
//         .then(response => response.text())
//         .then(rawMarkdown => kcMessages[kcLanguageTag].termsText = rawMarkdown);
//
//     },
//     [kcLanguageTag]
//   );
//
//   return (
//       <KcApp
//         kcContext={kcContext}
//         {...{
//           ...defaultKcProps,
//           // "kcHeaderWrapperClass": css({ "color": "red", "fontFamily": '"Work Sans"' })
//         }}
//       />
//   );
// }
