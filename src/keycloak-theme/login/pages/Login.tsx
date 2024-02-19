import { useState, type FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import eyeClose from "../assets/eye_close.svg"

const my_custom_param = new URL(window.location.href).searchParams.get("my_custom_param");

if (my_custom_param !== null) {
    console.log("my_custom_param:", my_custom_param);
}

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, registrationDisabled, login } = kcContext;

    const { msg } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();

        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        formElement.submit();
    });

    return (
        <Template
            {...{ kcContext, i18n, doUseDefaultCss, classes }}
            displayInfo={
                realm.password &&
                realm.registrationAllowed &&
                !registrationDisabled
            }
            displayWide={realm.password && social.providers !== undefined}
            headerNode="ระบบบันทึกบัญชีขององค์กรปกครองส่วนท้องถิ่น ( Local Administrative Accounting System )"
            infoNode={
                <div id="kc-registration">
                    <span>
                        {msg("noAccount")}
                        <a tabIndex={6} href={url.registrationUrl}>
                            {msg("doRegister")}
                        </a>
                    </span>
                </div>
            }
        >
            <div id="kc-form" className={clsx(realm.password && social.providers !== undefined && getClassName("kcContentWrapperClass"))}>
                <div
                    id="kc-form-wrapper"
                    className={clsx(
                        realm.password &&
                        social.providers && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                    )}
                >
                    {realm.password && (
                        <form id="form-login" onSubmit={onSubmit} action={url.loginAction} method="POST" className="space-y-6">
                            <div className="space-y-1">
                                <label htmlFor="username" className="block text-sm font-normal text-black">รหัสผู้ใช้ <span className="required">*</span></label>
                                <div className="mt-1 flex items-center relative">
                                    <input
                                        id="username"
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        autoFocus={true}
                                        autoComplete="off"
                                        required
                                        className="block appearance-none placeholder-gray-400 border-slate-300 border outline-none [ rounded-md ]" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label htmlFor="password" className="block text-sm font-normal text-black">รหัสผ่าน <span className="required">*</span></label>
                                <div className="mt-1 flex items-center relative">
                                    <input
                                        tabIndex={2}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        required
                                        className="block appearance-none placeholder-gray-400 border-slate-300 border outline-none [ rounded-md ]" />
                                </div>

                                <div className="flex justify-end relative" style={{ transform: "translate(-11px, -39px)", float: "right", cursor: "pointer" }} id="eye-wrapper">
                                    <img src={eyeClose} alt="แสดงรหัสผ่าน" style={{ width: "25px", height: "25px" }} id="eye-icon" data-eye-status="off" />
                                </div>
                            </div>

                            <button id="submitBtn" type="submit" className="m-auto flex justify-center button-primary [ p-3 ] [ text-base font-normal text-white ]" disabled={isLoginButtonDisabled}>เข้าสู่ระบบ</button>
                        </form>
                    )}
                </div>
                {realm.password && social.providers !== undefined && (
                    <div
                        id="kc-social-providers"
                        className={clsx(getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass"))}
                    >
                        <ul
                            className={clsx(
                                getClassName("kcFormSocialAccountListClass"),
                                social.providers.length > 4 && getClassName("kcFormSocialAccountDoubleListClass")
                            )}
                        >
                            {social.providers.map(p => (
                                <li key={p.providerId} className={getClassName("kcFormSocialAccountListLinkClass")}>
                                    <a href={p.loginUrl} id={`zocial-${p.alias}`} className={clsx("zocial", p.providerId)}>
                                        <span>{p.displayName}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Template>
    );
}
