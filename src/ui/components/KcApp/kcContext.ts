import "minimal-polyfills/Object.fromEntries";
import { getKcContext } from "keycloakify";
import { kcMessages } from "keycloakify/lib/i18n/useKcMessage";
import type { KcLanguageTag } from "keycloakify";
import { id } from "tsafe/id";

/** It's the Keycloak context, it is undefined unless we are on Keycloak, rendering the login pages. */
export const { kcContext } = getKcContext({
    //"mockPageId": "register-user-profile.ftl",
    /**
     * Customize the simulated kcContext that will let us
     * dev the page outside keycloak (with auto-reload)
     */
    "mockData": [
        {
            "pageId": "login.ftl",
            "social": {
                "providers": [
                    {
                        "alias": "agentconnect",
                        "displayName": "Agent Connect",
                        "loginUrl": "#",
                        "providerId": "agentconnect",
                    },
                ],
            },
        },
        {
            "pageId": "register-user-profile.ftl",
            "profile": {
                "attributes": [
                    {
                        "validators": {
                            "pattern": {
                                "pattern": "^[a-zA-Z0-9]+$",
                                "ignore.empty.value": true,
                                // eslint-disable-next-line no-template-curly-in-string
                                "error-message": "${alphanumericalCharsOnly}",
                            },
                        },
                        "value": undefined,
                        "name": "username",
                    },
                    {
                        "validators": {
                            "pattern": {
                                /* spell-checker: disable */
                                "pattern":
                                    "^[^@]+@([^.]+.)?((insee.fr)|(gouv.fr)|(ensae.fr)|(ensai.fr)|(ign.fr)|(has-sante.fr)|(casd.eu)|(ars.sante.fr)|(cnaf.fr)|(ac-lille.fr)|(ac-amiens.fr)|(ac-normandie.fr)|(ac-reims.fr)|(ac-nancy-metz.fr)|(ac-strasbourg.fr)|(ac-creteil.fr)|(ac-paris.fr)|(ac-versailles.fr)|(ac-rennes.fr)|(ac-nantes.fr)|(ac-orleans-tours.fr)|(ac-dijon.fr)|(ac-besancon.fr)|(ac-poitiers.fr)|(ac-limoges.fr)|(ac-clermont.fr)|(ac-lyon.fr)|(ac-grenoble.fr)|(ac-bordeaux.fr)|(ac-toulouse.fr)|(ac-montpellier.fr)|(ac-aix-marseille.fr)|(ac-nice.fr)|(ac-corse.fr)|(ac-martinique.fr)|(ac-guadeloupe.fr)|(ac-reunion.fr)|(ac-guyane.fr)|(ac-mayotte.fr)|(ac-wf.wf)|(monvr.pf)|(ac-noumea.nc)|(ac-spm.fr))$",
                                /* spell-checker: enabled */
                            },
                        },
                        "name": "email",
                    },
                ],
            },
        },
    ],
});

export type KcContext = NonNullable<typeof kcContext>;

{
    const extraKeys: Record<string, Partial<Record<KcLanguageTag, string>>> = {
        "alphanumericalCharsOnly": {
            "en": "Only alphanumerical characters",
            /* spell-checker: disable */
            "fr": "Caractère alphanumérique uniquement",
            /* spell-checker: enable */
        },
    };

    id<KcLanguageTag[]>(["fr", "en"]).forEach(kcLanguageTag =>
        Object.assign(
            kcMessages[kcLanguageTag],
            Object.fromEntries(
                Object.entries(extraKeys).map(([key, wrap]) => [
                    key,
                    wrap[kcLanguageTag],
                ]),
            ),
        ),
    );
}
