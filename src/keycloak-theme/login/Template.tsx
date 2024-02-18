// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { useState } from "react";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/login/TemplateProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import logo from "./assets/logo.svg"
import warnings from "./assets/warnings.svg"
import info from "./assets/info.svg"
import bg from "./assets/bg.jpg"

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        displayWide = false,
        showAnotherWayIfPresent = true,
        headerNode,
        showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

    const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext;

    const { isReady } = usePrepareTemplate({
        "doFetchDefaultThemeResources": doUseDefaultCss,
        "styles": [
            `${url.resourcesPath}/css/style.css`,
            `${url.resourcesPath}/css/uno.css`
        ],
        "htmlClassName": getClassName("kcHtmlClass"),
        "bodyClassName": getClassName("kcBodyClass")
    });

    useState(() => { document.title = i18n.msgStr("loginTitle", kcContext.realm.displayName); });

    if (!isReady) {
        return null;
    }

    return (
        <div>
            <main className="flex min-h-full">
                <aside id="login" className="flex flex-1 flex-col justify-center py-11 px-3 sm:px-6 lgx:flex-none md:px-14 shadow-x relative z-10">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className="text-center">
                            <img src={logo} alt="องค์กรปกครองส่วนท้องถิ่น" width={132} />
                            <h2 className="mt-6 [ text-primary font-semibold my-2 whitespace-nowrap ]" style={{ fontSize: "clamp(1.45rem, 0.964rem + 0.762vw, 1.85rem)" }}>กรมส่งเสริมการปกครองท้องถิ่น</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                <span className="font-normal text-gray-600">กรุณาลงชื่อเข้าใช้เพื่อเข้าสู่ระบบ</span>
                            </p>
                        </div>
                        <div className="mt-6">
                            <div style={{ minHeight: "43px" }} id="errorWrapper">
                                <div id="error" className="[ font-normal text-required text-sm ] flex items-center my-1 gap-2.5 appearance-none outline-none [ rounded-md ] pb-1 pt-0" style={{ visibility: "hidden" }}>
                                    <img src={warnings} alt="แจ้งเตือน" />
                                    <span className="text-required">กรุณาตรวจสอบรหัสผู้ใช้หรือรหัสผ่านให้ถูกต้อง</span>
                                </div>
                            </div>

                            {children}
                        </div>
                    </div>

                    <div className="mx-auto w-full max-w-lg">
                        <p className="[ font-light text-sm text-secondary text-center ] mt-9">
                            <span className="nowrap">New e-LAAS</span> เป็นโปรแกรมสำหรับการ<span className="nowrap">ปฎิบัติงาน</span>ด้านการคลังของ อปท. อปท.ต้อง<span className="nowrap">ปฎิบัติงาน</span>การ<span className="nowrap">รับ-จ่าย</span> ที่เกิดขึ้นจริง<span className="nowrap">ประจำวัน</span>เพื่อแสดงสถานะ<span className="nowrap">การเงินที่แท้จริงของ อปท.</span>
                        </p>
                    </div>

                    <footer className="flex mx-auto mt-4 w-full">
                        <div className="pr-5 w-[49%]">
                            <h3 className="text-primary text-right mt-2" style={{ marginInlineStart: "-1rem" }}>กรมส่งเสริมการปกครอง<span className="nowrap">ท้องถิ่น</span></h3>
                            <address>
                                <ul className="list-none p-0 m-0 address">
                                    <li className="text-sm">ถนนนครราชสีมา เขตุดุสิต</li>
                                    <li className="text-sm">โทรศัพท์ 0-2241-9000</li>
                                    <li className="text-sm">ต่อ 167, 1608, 1611</li>
                                    <li className="text-sm">โทรสาร 0-2241-9044</li>
                                </ul>
                            </address>
                        </div>
                        <div className="right-schranken"></div>
                        <div className="pl-5 w-[49%]">
                            <h3 className="text-primary text-left mt-2" style={{ marginInlineEnd: "-1rem" }}>Call center</h3>
                            <ul className="list-none p-0 m-0 callcenter">
                                <li className="text-sm">โทรศัพท์ 0-2206-6300</li>
                            </ul>
                        </div>
                    </footer>

                    <div className="w-full text-center m-auto my-4">
                        <button type="button" className="inline-flex gap-1 items-center rounded-md text-primary border-primary bg-white px-3 py-2 text-sm font-normal leading-4">
                            <img src={info} />
                            แจ้งปัญหาในการทำงานคลิ๊กที่นี่
                        </button>
                    </div>
                </aside>

                <aside id="news" className="relative flex-1 lgx:block relative z-10">
                    <div className="bg-elaas" style={{ background: `url(${bg})` }}>
                        <div className="inner">
                            <div className="flex justify-end">
                                <a id="tokm" target="_blank" className="flex !text-white gap-2.5 items-center justify-center button-primary [ py-[1.1875rem] px-[1.6875rem] ] [ text-sm font-normal text-white ] cursor-pointer shadow-x">
                                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.8 16.3432H8.1V18.1147H1.8C0.801 18.1147 0 17.3264 0 16.3432V2.17182C0 1.70201 0.189642 1.25144 0.527208 0.91923C0.864773 0.587023 1.32261 0.400391 1.8 0.400391H12.6C13.0774 0.400391 13.5352 0.587023 13.8728 0.91923C14.2104 1.25144 14.4 1.70201 14.4 2.17182V9.73582L13.05 9.00953L12.6 9.25753V2.17182H8.1V9.25753L5.85 7.26468L3.6 9.25753V2.17182H1.8V16.3432ZM18 13.6861L13.05 11.029L8.1 13.6861L13.05 16.3432L18 13.6861ZM9.9 15.5372V17.3087L13.05 19.0004L16.2 17.3087V15.5372L13.05 17.229L9.9 15.5372Z" fill="white" />
                                    </svg>
                                    <span>คลังความรู้ ระบบ New e-LAAS</span>
                                </a>
                            </div>
                            <div className="mt-4 sm:mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="col-span-2 bg-white p-5 rounded-md shadow-y">
                                    <section>
                                        <h4 className="m-1 [ text-primary font-semibold ]">ข่าวสารอัพเดต</h4>
                                        <hr />
                                            <div className="flex flex-1 min-h-[300px] justify-center items-center" id="loadingnews">
                                                กำลังโหลดข้อมูล...
                                            </div>
                                            <ul className="news" id="newslist">
                                            </ul>
                                    </section>
                                    <section className="flex justify-end">
                                        <a href="https://wordpress-uat.elaas.pub" className="flex !text-white gap-1.5 items-center justify-center button-primary [ py-2 px-4 ] [ text-sm font-normal text-white ] cursor-pointer">อ่านเพิ่มเติม
                                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "relative", top: "2px" }}>
                                                <path d="M4.88712 3.02582L2.06045 0.199152C1.99847 0.136666 1.92474 0.08707 1.8435 0.0532242C1.76226 0.0193785 1.67512 0.00195312 1.58712 0.00195312C1.49911 0.00195312 1.41197 0.0193785 1.33073 0.0532242C1.24949 0.08707 1.17576 0.136666 1.11378 0.199152C0.989616 0.32406 0.919922 0.493028 0.919922 0.669152C0.919922 0.845276 0.989616 1.01424 1.11378 1.13915L3.47378 3.49915L1.11378 5.85915C0.989616 5.98406 0.919922 6.15303 0.919922 6.32915C0.919922 6.50528 0.989616 6.67424 1.11378 6.79915C1.17608 6.86094 1.24995 6.90982 1.33118 6.943C1.4124 6.97618 1.49938 6.99299 1.58712 6.99248C1.67485 6.99299 1.76183 6.97618 1.84305 6.943C1.92428 6.90982 1.99816 6.86094 2.06045 6.79915L4.88712 3.97249C4.9496 3.91051 4.9992 3.83678 5.03304 3.75554C5.06689 3.6743 5.08432 3.58716 5.08432 3.49915C5.08432 3.41114 5.06689 3.32401 5.03304 3.24277C4.9992 3.16153 4.9496 3.08779 4.88712 3.02582Z" fill="white" />
                                            </svg>
                                        </a>
                                    </section>
                                </div>
                                <div className="flex flex-col justify-between col-span-2 1.5xl:col-span-1 bg-white p-5 rounded-md shadow-y">
                                    <section>
                                        <h4 className="m-1 [ text-primary font-semibold ]">เตรียมพร้อมก่อนใช้งาน</h4>
                                        <hr />
                                        <ul className="news" id="preparelist">
                                            <div id="loadingprepare" className="flex flex-1 justify-center items-center">
                                                กำลังโหลดข้อมูล...
                                            </div>
                                        </ul>
                                    </section>
                                    <section className="flex justify-end">
                                        <a id="preparelink" className="flex !text-white gap-1.5 items-center justify-center button-primary [ py-2 px-4 ] [ text-sm font-normal text-white ] cursor-pointer">อ่านเพิ่มเติม
                                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" style={{ position: "relative", top: "2px" }}>
                                                <path d="M4.88712 3.02582L2.06045 0.199152C1.99847 0.136666 1.92474 0.08707 1.8435 0.0532242C1.76226 0.0193785 1.67512 0.00195312 1.58712 0.00195312C1.49911 0.00195312 1.41197 0.0193785 1.33073 0.0532242C1.24949 0.08707 1.17576 0.136666 1.11378 0.199152C0.989616 0.32406 0.919922 0.493028 0.919922 0.669152C0.919922 0.845276 0.989616 1.01424 1.11378 1.13915L3.47378 3.49915L1.11378 5.85915C0.989616 5.98406 0.919922 6.15303 0.919922 6.32915C0.919922 6.50528 0.989616 6.67424 1.11378 6.79915C1.17608 6.86094 1.24995 6.90982 1.33118 6.943C1.4124 6.97618 1.49938 6.99299 1.58712 6.99248C1.67485 6.99299 1.76183 6.97618 1.84305 6.943C1.92428 6.90982 1.99816 6.86094 2.06045 6.79915L4.88712 3.97249C4.9496 3.91051 4.9992 3.83678 5.03304 3.75554C5.06689 3.6743 5.08432 3.58716 5.08432 3.49915C5.08432 3.41114 5.06689 3.32401 5.03304 3.24277C4.9992 3.16153 4.9496 3.08779 4.88712 3.02582Z" fill="white" />
                                            </svg>
                                        </a>
                                    </section>
                                </div>
                                <div className="flex flex-col justify-between col-span-2 1.5xl:col-span-1 bg-white p-5 rounded-md shadow-y">
                                    <section>
                                        <h4 className="m-1 [ text-primary font-semibold ]">แก้ปัญหาการใช้งาน</h4>
                                        <hr />
                                            <ul className="news" id="resolvelist">
                                                <div id="loadingresolve" className="flex flex-1 justify-center items-center">
                                                    กำลังโหลดข้อมูล...
                                                </div>
                                            </ul>
                                    </section>
                                    <section className="flex justify-end">
                                        <a id="resolvelink" className="flex !text-white gap-1.5 items-center justify-center button-primary [ py-2 px-4 ] [ text-sm font-normal text-white ] cursor-pointer">อ่านเพิ่มเติม
                                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: "relative", top: "2px"}}>
                                                <path d="M4.88712 3.02582L2.06045 0.199152C1.99847 0.136666 1.92474 0.08707 1.8435 0.0532242C1.76226 0.0193785 1.67512 0.00195312 1.58712 0.00195312C1.49911 0.00195312 1.41197 0.0193785 1.33073 0.0532242C1.24949 0.08707 1.17576 0.136666 1.11378 0.199152C0.989616 0.32406 0.919922 0.493028 0.919922 0.669152C0.919922 0.845276 0.989616 1.01424 1.11378 1.13915L3.47378 3.49915L1.11378 5.85915C0.989616 5.98406 0.919922 6.15303 0.919922 6.32915C0.919922 6.50528 0.989616 6.67424 1.11378 6.79915C1.17608 6.86094 1.24995 6.90982 1.33118 6.943C1.4124 6.97618 1.49938 6.99299 1.58712 6.99248C1.67485 6.99299 1.76183 6.97618 1.84305 6.943C1.92428 6.90982 1.99816 6.86094 2.06045 6.79915L4.88712 3.97249C4.9496 3.91051 4.9992 3.83678 5.03304 3.75554C5.06689 3.6743 5.08432 3.58716 5.08432 3.49915C5.08432 3.41114 5.06689 3.32401 5.03304 3.24277C4.9992 3.16153 4.9496 3.08779 4.88712 3.02582Z" fill="white" />
                                            </svg>
                                        </a>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
            {/* <div className={getClassName("kcLoginClass")}>
                <div id="kc-header" className={getClassName("kcHeaderClass")}>
                    <div
                        id="kc-header-wrapper"
                        className={getClassName("kcHeaderWrapperClass")}
                        style={{ "fontFamily": '"Work Sans"' }}
                    >
                        <img src={logo} alt="องค์กรปกครองส่วนท้องถิ่น" />
                    </div>
                </div>

                <div className={clsx(getClassName("kcFormCardClass"), displayWide && getClassName("kcFormCardAccountClass"))}>
                    <header className={getClassName("kcFormHeaderClass")}>
                        {realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1 && (
                            <div id="kc-locale">
                                <div id="kc-locale-wrapper" className={getClassName("kcLocaleWrapperClass")}>
                                    <div className="kc-dropdown" id="kc-locale-dropdown">
                                        <a href="#" id="kc-current-locale-link">
                                            {labelBySupportedLanguageTag[currentLanguageTag]}
                                        </a>
                                        <ul>
                                            {locale.supported.map(({ languageTag }) => (
                                                <li key={languageTag} className="kc-dropdown-item">
                                                    <a href="#" onClick={() => changeLocale(languageTag)}>
                                                        {labelBySupportedLanguageTag[languageTag]}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!(auth !== undefined && auth.showUsername && !auth.showResetCredentials) ? (
                            displayRequiredFields ? (
                                <div className={getClassName("kcContentWrapperClass")}>
                                    <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                        <span className="subtitle">
                                            <span className="required">*</span>
                                            {msg("requiredFields")}
                                        </span>
                                    </div>
                                    <div className="col-md-10">
                                        <h1 id="kc-page-title">{headerNode}</h1>
                                    </div>
                                </div>
                            ) : (
                                <h1 id="kc-page-title">{headerNode}</h1>
                            )
                        ) : displayRequiredFields ? (
                            <div className={getClassName("kcContentWrapperClass")}>
                                <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                    <span className="subtitle">
                                        <span className="required">*</span> {msg("requiredFields")}
                                    </span>
                                </div>
                                <div className="col-md-10">
                                    {showUsernameNode}
                                    <div className={getClassName("kcFormGroupClass")}>
                                        <div id="kc-username">
                                            <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                            <a id="reset-login" href={url.loginRestartFlowUrl}>
                                                <div className="kc-login-tooltip">
                                                    <i className={getClassName("kcResetFlowIcon")}></i>
                                                    <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                {showUsernameNode}
                                <div className={getClassName("kcFormGroupClass")}>
                                    <div id="kc-username">
                                        <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                        <a id="reset-login" href={url.loginRestartFlowUrl}>
                                            <div className="kc-login-tooltip">
                                                <i className={getClassName("kcResetFlowIcon")}></i>
                                                <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </>
                        )}
                    </header>
                    <div id="kc-content">
                        <div id="kc-content-wrapper">
                            {displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction) && (
                                <div className={clsx("alert", `alert-${message.type}`)}>
                                    {message.type === "success" && <span className={getClassName("kcFeedbackSuccessIcon")}></span>}
                                    {message.type === "warning" && <span className={getClassName("kcFeedbackWarningIcon")}></span>}
                                    {message.type === "error" && <span className={getClassName("kcFeedbackErrorIcon")}></span>}
                                    {message.type === "info" && <span className={getClassName("kcFeedbackInfoIcon")}></span>}
                                    <span
                                        className="kc-feedback-text"
                                        dangerouslySetInnerHTML={{
                                            "__html": message.summary
                                        }}
                                    />
                                </div>
                            )}
                            {children}
                            {auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent && (
                                <form
                                    id="kc-select-try-another-way-form"
                                    action={url.loginAction}
                                    method="post"
                                    className={clsx(displayWide && getClassName("kcContentWrapperClass"))}
                                >
                                    <div
                                        className={clsx(
                                            displayWide && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                                        )}
                                    >
                                        <div className={getClassName("kcFormGroupClass")}>
                                            <input type="hidden" name="tryAnotherWay" value="on" />
                                            <a
                                                href="#"
                                                id="try-another-way"
                                                onClick={() => {
                                                    document.forms["kc-select-try-another-way-form" as never].submit();
                                                    return false;
                                                }}
                                            >
                                                {msg("doTryAnotherWay")}
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            )}
                            {displayInfo && (
                                <div id="kc-info" className={getClassName("kcSignUpClass")}>
                                    <div id="kc-info-wrapper" className={getClassName("kcInfoAreaWrapperClass")}>
                                        {infoNode}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}
