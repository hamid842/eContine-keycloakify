import type { SupportedLanguage, fallbackLanguage } from "./translations";
import { createUseGlobalState } from "powerhooks/useGlobalState";
import { changeLocale } from "keycloakify";
import { assert } from "tsafe/assert";
import { id } from "tsafe/id";
import type { Equals } from "tsafe";

const supportedLanguage = ["en", "fr","de"] as const;

assert<Equals<SupportedLanguage, typeof supportedLanguage[number]>>();

export const { useLng, evtLng } = createUseGlobalState("lng", (): SupportedLanguage => {
    const iso2LanguageLike = navigator.language.split("-")[0].toLowerCase();

    const lng = supportedLanguage.find(lng =>
        lng.toLowerCase().includes(iso2LanguageLike),
    );

    if (lng !== undefined) {
        return lng;
    }

    return id<typeof fallbackLanguage>("en");
});

//NOTE: When we change language in the main APP we change as well for the login pages
evtLng.toStateless().attach((lng:any) => (changeLocale(lng)));
