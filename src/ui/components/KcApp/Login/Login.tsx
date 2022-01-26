import {memo, useState, useRef, useEffect} from "react";
import type {KcProps} from "keycloakify/lib/components/KcProps";
import {useKcMessage} from "keycloakify/lib/i18n/useKcMessage";
import {useConstCallback} from "powerhooks/useConstCallback";
import {Typography, Button, TextField, FormControlLabel, Checkbox, Link, createTheme} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useEvt} from "evt/hooks";
import {Evt} from "evt";
import {useTranslation} from "i18n/useTranslations";
import type {KcContext} from "../kcContext";
import LoginLayout from "./LoginLayout";
import LoginFormBox from './LoginFormBox';
import {getBrowser} from "ui/tools/getBrowser";
import logo from 'assets/images/E.png'
import LocaleButton from "../../shared/LocaleButton";

const theme = createTheme();

const useStyles = makeStyles(() => ({
    rememberMeForgotPasswordWrapper: {
        display: "flex",
    },
    forgotPassword: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },

    buttonsWrapper: {
        marginTop: theme.spacing(4),
        display: "flex",
        justifyContent: "flex-end",
    },
    linkToRegisterWrapper: {
        marginTop: theme.spacing(5),
        textAlign: "center",
        "& > *": {
            display: "inline-block",
        },
    },
    registerLink: {
        paddingLeft: theme.spacing(2),
    },
    providers: {
        listStyleType: "none",
        padding: 0,
    },
    submitBtn: {
        color: '#1d5149 !important',
        border: `1px solid #1d5149 !important`,
        '& hover': {
            backgroundColor: '#1d5149 !important'
        }
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}))


type KcContext_Login = Extract<KcContext, { pageId: "login.ftl" }>;

export const Login = memo(
    ({kcContext, ...props}: { kcContext: KcContext_Login } & KcProps) => {
        const {msg, msgStr} = useKcMessage();

        const classes = useStyles();

        const {
            social,
            realm,
            url,
            usernameEditDisabled,
            login,
            auth,
            registrationDisabled,
        } = kcContext;

        const usernameInputRef = useRef<HTMLInputElement>(null);
        const passwordInputRef = useRef<HTMLInputElement>(null);
        const submitButtonRef = useRef<HTMLButtonElement>(null);

        const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
        const [areTextInputsDisabled, setAreTextInputsDisabled] = useState(
            () => getBrowser() === "safari",
        );


        {
            const [passwordInput, setPasswordInput] = useState<HTMLInputElement | null>(
                null,
            );

            useEffect(() => {
                setPasswordInput(passwordInputRef.current);
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [passwordInputRef.current ?? {}]);

            useEvt(
                ctx => {
                    if (passwordInput === null) {
                        return;
                    }

                    switch (getBrowser()) {
                        case "chrome":
                        case "safari":
                            Evt.from(ctx, passwordInput, "change").attach(
                                () =>
                                    usernameInputRef.current?.matches(
                                        ":-webkit-autofill",
                                    ) ?? false,
                                () => {
                                    switch (getBrowser()) {
                                        case "chrome":
                                            //NOTE: Only works after user input
                                            submitButtonRef.current?.focus();
                                            break;
                                        case "safari":
                                            setTimeout(
                                                () => submitButtonRef.current?.focus(),
                                                100,
                                            );
                                            break;
                                    }
                                },
                            );
                            break;
                    }
                },
                [passwordInput],
            );
        }


        const onSubmit = useConstCallback(() => {
            setIsLoginButtonDisabled(true);
            return true;
        });


        const {t} = useTranslation({Login})

        return (
            <LoginLayout {...props}>
                <LoginFormBox>
                    <div className={classes.header}>
                        <img src={logo} alt={'Logo'} height={60} width={200}/>
                        <LocaleButton/>
                    </div>
                    <Typography variant={'h5'} sx={{my: 2}}>{t('title')}</Typography>
                    <div>
                        {realm.password && social.providers !== undefined && (
                            <>
                                <div>
                                    <ul className={classes.providers}>
                                        {social.providers.map(p => (
                                            <li key={p.providerId}>
                                                <Button href={p.loginUrl}>
                                                    {p.displayName}
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                        {realm.password && (
                            <form
                                onSubmit={onSubmit}
                                action={url.loginAction}
                                method="post"
                            >
                                <div>
                                    <TextField
                                        fullWidth
                                        sx={{my: 1}}
                                        disabled={
                                            usernameEditDisabled ||
                                            areTextInputsDisabled
                                        }
                                        defaultValue={login.username ?? ""}
                                        id="username"
                                        name="username"
                                        ref={usernameInputRef}
                                        aria-label="username"
                                        tabIndex={1}
                                        autoFocus={!areTextInputsDisabled}
                                        variant={'standard'}
                                        label={
                                            !realm.loginWithEmailAllowed
                                                ? msg("username")
                                                : !realm.registrationEmailAsUsername
                                                    ? msg("usernameOrEmail")
                                                    : msg("email")
                                        }
                                        autoComplete="off"
                                        // getIsValidValue={getUsernameIsValidValue}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        fullWidth
                                        sx={{my: 1}}
                                        disabled={areTextInputsDisabled}
                                        type="password"
                                        defaultValue={""}
                                        id="password"
                                        name="password"
                                        ref={passwordInputRef}
                                        aria-label={"password"}
                                        tabIndex={2}
                                        label={msg("password")}
                                        variant={'standard'}
                                        autoComplete="off"
                                        // getIsValidValue={getPasswordIsValidValue}
                                    />
                                </div>
                                <div
                                    className={
                                        classes.rememberMeForgotPasswordWrapper
                                    }
                                >
                                    <div>
                                        {realm.rememberMe && !usernameEditDisabled && (
                                            <div>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            tabIndex={3}
                                                            defaultChecked={
                                                                !!login.rememberMe
                                                            }
                                                            name="rememberMe"
                                                            color="primary"
                                                        />
                                                    }
                                                    label={
                                                        <Typography variant="body2" sx={{marginTop: 0.5}}>
                                                            {msg("rememberMe")!}
                                                        </Typography>
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className={classes.forgotPassword}>
                                        {realm.resetPasswordAllowed && (
                                            <Link
                                                href={url.loginResetCredentialsUrl}
                                                underline="hover"
                                            >
                                                {msg("doForgotPassword")}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                <div className={classes.buttonsWrapper}>
                                    <input
                                        type="hidden"
                                        name="credentialId"
                                        {...(auth?.selectedCredential !== undefined
                                            ? {
                                                "value": auth.selectedCredential,
                                            }
                                            : {})}
                                    />
                                    <Button
                                        fullWidth
                                        ref={submitButtonRef}
                                        tabIndex={3}
                                        name="login"
                                        type="submit"
                                        disabled={isLoginButtonDisabled}
                                        variant={'outlined'}
                                        className={classes.submitBtn}
                                    >
                                        {msgStr("doLogIn")}
                                    </Button>
                                </div>
                            </form>
                        )}
                        {
                            realm.password &&
                            realm.registrationAllowed &&
                            !registrationDisabled && (
                                <div className={classes.linkToRegisterWrapper}>
                                    <Typography variant="body2" color="secondary">
                                        {msg("noAccount")!}
                                    </Typography>
                                    <Link
                                        href={url.registrationUrl}
                                        className={classes.registerLink}
                                        underline="hover"
                                    >
                                        {/*Register*/}
                                        {t("doRegister")}
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </LoginFormBox>
            </LoginLayout>
        )

    }
)

export declare namespace Login {
    export type I18nScheme = {
        "doRegister": undefined;
        "title": undefined
    };
}

