import {useMemo, memo, useEffect, Fragment} from "react";
import type {KcProps} from "keycloakify";
import type {KcContextBase} from "keycloakify";
import {getMsg, getCurrentKcLanguageTag} from "keycloakify";
import {makeStyles} from "@mui/styles";
import {Button, TextField, Tooltip, Typography} from "@mui/material";
import {useConstCallback} from "powerhooks/useConstCallback";
import {useCallbackFactory} from "powerhooks/useCallbackFactory";
import {useFormValidationSlice} from "keycloakify";
// import type { Param0 } from "tsafe";

import Layout from "../Layout";
import FormBox from "../FormBox";
import {useTranslation} from "i18n/useTranslations";
// import { capitalize } from "tsafe/capitalize";
import {generateUsername} from "../generateUsername";
import logo from "../../../../assets/images/E.png";
import LocaleButton from "../../shared/LocaleButton";

const useStyles = makeStyles(({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}))


export const RegisterUserProfile = memo(
    ({kcContext, ...props}: { kcContext: KcContextBase.RegisterUserProfile } & KcProps) => {
        const {url, messagesPerField, recaptchaRequired, recaptchaSiteKey} = kcContext;

        const currentKcLanguageTag: any = getCurrentKcLanguageTag(kcContext)
        const {msg, msgStr,advancedMsg} = getMsg(currentKcLanguageTag);
        const classes = useStyles();

        console.log(url, messagesPerField, msg, classes)

        // const props = useMemo(
        //     () => ({
        //         ...props_,
        //         "kcFormGroupClass": cx(
        //             props_.kcFormGroupClass,
        //             css({ "marginBottom": 20 }),
        //         ),
        //     }),
        //     [cx, css],
        // );

        const {t} = useTranslation({RegisterUserProfile});

        const redirectToLogin = useConstCallback(
            () => (window.location.href = url?.loginUrl),
        );

        const passwordValidators = useMemo(
            () => ({
                "_compareToOther": {
                    "error-message": t("must be different from username"),
                    "ignore.empty.value": true,
                    "name": "username",
                    "shouldBe": "different" as const,
                },
                "length": {
                    "min": "3" as const,
                    "ignore.empty.value": true,
                },
            }),
            [t],
        );

        const {
            formValidationState: {fieldStateByAttributeName, isFormSubmittable},
            formValidationReducer,
            attributesWithPassword: unorderedAttributesWithPassword,
        } = useFormValidationSlice({
            kcContext,
            passwordValidators,
        });

        const attributesWithPassword = useMemo(
            () =>
                unorderedAttributesWithPassword.sort(
                    (a, b) =>
                        getHardCodedFieldWeight(b.name) - getHardCodedFieldWeight(a.name),
                ),
            [unorderedAttributesWithPassword],
        );

        // const onChangeFactory = useCallbackFactory(
        //     (
        //         [name]: [string],
        //         [{ value }]: [Param0<TextFieldProps["onValueBeingTypedChange"]>],
        //     ) =>
        //         formValidationReducer({
        //             "action": "update value",
        //             name,
        //             "newValue": value,
        //         }),
        // );

        const onBlurFactory = useCallbackFactory(([name]: [string]) =>
            formValidationReducer({
                "action": "focus lost",
                name,
            }),
        );

        useEffect(() => {
            attributesWithPassword
                .filter(
                    ({name}) =>
                        !["username", "email", "password", "password-confirm"].includes(
                            name,
                        ),
                )
                .map(({name}) =>
                    formValidationReducer({
                        "action": "focus lost",
                        name,
                    }),
                );
        }, [attributesWithPassword, formValidationReducer]);

        const areAllFieldsRequired = useMemo(
            () => attributesWithPassword.every(({required}) => required),
            [attributesWithPassword],
        );

        {
            const firstName = fieldStateByAttributeName["firstName"]?.value ?? "";
            const lastName = fieldStateByAttributeName["lastName"]?.value ?? "";

            useEffect(() => {
                if (firstName === "") {
                    return;
                }

                formValidationReducer({
                    "action": "update value",
                    "name": "username",
                    "newValue": generateUsername({firstName, lastName}),
                });
            }, [firstName, formValidationReducer, lastName]);
        }

        let currentGroup = "";

        const getIncrementedTabIndex = (() => {
            let counter = 1;
            return () => counter++;
        })();

        return (
            <Layout {...props}>
                <FormBox>
                    <div className={classes.header}>
                        <img src={logo} alt={'Logo'} height={60} width={200}/>
                        <LocaleButton/>
                    </div>
                    <Typography variant={'h5'} sx={{my: 2}}>{t('title')}</Typography>
                    <form
                        action={url?.registrationAction}
                        method="post"
                    >
                        <>
                            {attributesWithPassword.map((attribute, i) => {
                                const {
                                    group = "",
                                    groupDisplayHeader = "",
                                    groupDisplayDescription = "",
                                } = attribute;

                                const {value, displayableErrors} =
                                    fieldStateByAttributeName[attribute.name];

                                // const formGroupClassName = cx(
                                //     props.kcFormGroupClass,
                                //     displayableErrors.length !== 0 &&
                                //     props.kcFormGroupErrorClass,
                                // );

                                return (
                                    <Fragment key={i}>
                                        {group !== currentGroup &&
                                            (currentGroup = group) !== "" && (
                                                <div>
                                                    <div

                                                    >
                                                        <label
                                                            id={`header-${group}`}

                                                        >
                                                            {advancedMsg(
                                                                groupDisplayHeader,
                                                            ) || currentGroup}
                                                        </label>
                                                    </div>
                                                    {groupDisplayDescription !== "" && (
                                                        <div

                                                        >
                                                            <label
                                                                id={`description-${group}`}

                                                            >
                                                                {advancedMsg(
                                                                    groupDisplayDescription,
                                                                )}
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        <TextField
                                            fullWidth
                                            size={'small'}
                                            sx={{my: 1}}
                                            type={(() => {
                                                switch (attribute.name) {
                                                    case "password-confirm":
                                                    case "password":
                                                        return "password";
                                                    default:
                                                        return "text";
                                                }
                                            })()}
                                            id={attribute.name}
                                            name={attribute.name}
                                            defaultValue={value}
                                            // className={cx(props.kcInputClass)}
                                            aria-invalid={displayableErrors.length !== 0}
                                            disabled={attribute.readOnly}
                                            autoComplete={attribute.autocomplete}
                                            onBlur={onBlurFactory(attribute.name)}
                                            aria-label={attribute.name}
                                            tabIndex={
                                                attribute.name === "username"
                                                    ? -1
                                                    : getIncrementedTabIndex()
                                            }
                                            // onValueBeingTypedChange={onChangeFactory(
                                            //     attribute.name,
                                            // )}
                                            autoFocus={i === 0}
                                            // transformValueBeingTyped={(() => {
                                            //     switch (attribute.name) {
                                            //         case "firstName":
                                            //         case "lastName":
                                            //             return capitalize;
                                            //         default:
                                            //             return undefined;
                                            //     }
                                            // })()}
                                            label={
                                                <>
                                                    {advancedMsg(
                                                        attribute.displayName ?? "",
                                                    )}
                                                    &nbsp;
                                                    {!areAllFieldsRequired &&
                                                        attribute.required &&
                                                        "*"}
                                                </>
                                            }
                                            helperText={(() => {
                                                const displayableErrors =
                                                    fieldStateByAttributeName[
                                                        attribute.name
                                                        ].displayableErrors.filter(
                                                        ({validatorName}) =>
                                                            !(
                                                                validatorName ===
                                                                "pattern" &&
                                                                attribute.name === "email"
                                                            ),
                                                    );

                                                if (displayableErrors.length !== 0) {
                                                    return displayableErrors.map(
                                                        ({errorMessage}, i) => (
                                                            <span key={i}>
                                                                {errorMessage}&nbsp;
                                                            </span>
                                                        ),
                                                    );
                                                }

                                                switch (attribute.name) {
                                                    case "email":
                                                        return t("allowed email domains");
                                                    case "password": {
                                                        const {min} =
                                                        attribute.validators.length ??
                                                        {};
                                                        if (min === undefined) {
                                                            break;
                                                        }

                                                        return t("minimum length", {
                                                            "n": `${parseInt(min)}`,
                                                        });
                                                    }
                                                }

                                                {
                                                    const {pattern} =
                                                        attribute.validators;

                                                    if (pattern !== undefined) {
                                                        const {
                                                            "error-message":
                                                                errorMessageKey,
                                                        } = pattern;

                                                        return errorMessageKey !==
                                                        undefined
                                                            ? advancedMsg(errorMessageKey)
                                                            : t(
                                                                "must respect the pattern",
                                                            );
                                                    }
                                                }

                                                return undefined;
                                            })()}
                                            // questionMarkHelperText={(() => {
                                            //     const { pattern } =
                                            //     attribute.validators.pattern ?? {};
                                            //
                                            //     return pattern === undefined
                                            //         ? undefined
                                            //         : attribute.name === "email"
                                            //             ? formatEmailPattern(pattern)
                                            //             : fieldStateByAttributeName[
                                            //                 attribute.name
                                            //                 ].displayableErrors.length === 0
                                            //                 ? pattern
                                            //                 : undefined;
                                            // })()}
                                            inputProps_aria-invalid={
                                                fieldStateByAttributeName[attribute.name]
                                                    .displayableErrors.length !== 0
                                            }
                                        />
                                    </Fragment>
                                );
                            })}
                        </>
                        {recaptchaRequired && (
                            <div className="form-group">
                                <div>
                                    <div
                                        className="g-recaptcha"
                                        data-size="compact"
                                        data-sitekey={recaptchaSiteKey}
                                    />
                                </div>
                            </div>
                        )}
                        <div className={classes.btnContainer}>
                            <Button

                                onClick={redirectToLogin}
                                tabIndex={-1}
                            >
                                {t("go back")}
                            </Button>
                            {(() => {
                                const button = (
                                    <Button

                                        // disabled={!isFormSubmittable}
                                        type="submit"
                                        tabIndex={getIncrementedTabIndex()}
                                    >
                                        {msgStr("doRegister")}
                                    </Button>
                                );

                                return isFormSubmittable ? (
                                    button
                                ) : (
                                    <Tooltip title={t("form not filled properly yet")}>
                                        <span>{button}</span>
                                    </Tooltip>
                                );
                            })()}
                        </div>
                    </form>
                </FormBox>
            </Layout>
        )
    }
)

// eslint-disable-next-line @typescript-eslint/no-redeclare
export declare namespace RegisterUserProfile {
    export type I18nScheme = {
        "title": undefined;
        "allowed email domains": undefined;
        "minimum length": { n: string };
        "must be different from username": undefined;
        "password mismatch": undefined;
        "go back": undefined;
        "form not filled properly yet": undefined;
        "must respect the pattern": undefined;
    };
}

const {getHardCodedFieldWeight} = (() => {
    const orderedFields = [
        "firstName",
        "lastName",
        "email",
        "username",
        "password",
        "password-confirm",
    ].map(fieldName => fieldName.toLowerCase());

    function getHardCodedFieldWeight(fieldName: string) {
        for (let i = 0; i < orderedFields.length; i++) {
            if (fieldName.toLowerCase().includes(orderedFields[i])) {
                return orderedFields.length - i;
            }
        }

        return 0;
    }

    return {getHardCodedFieldWeight};
})();

// function formatEmailPattern(pattern: string) {
//     try {
//         return pattern
//             .match(/\*\((.+)\)\$$/)![1]
//             .split("|")
//             .map(part =>
//                 part
//                     .match(/\(?([^)]+)\)?$/)![1]
//                     .replace(/\\./, ".")
//                     .replace(/\$$/, ""),
//             )
//             .join(", ");
//     } catch {
//         return pattern;
//     }
// }


