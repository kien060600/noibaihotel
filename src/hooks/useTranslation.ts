import { useRouter } from "next/router";
import { dictionaries, type Dictionary, type Locale } from "../lib/dictionaries";

export function useTranslation(): { t: Dictionary; locale: Locale; switchLocale: (newLocale: Locale) => void } {
    const router = useRouter();
    const locale = (["vi", "en", "zh"].includes(router.locale || "") ? router.locale : "vi") as Locale;
    const t = dictionaries[locale] || dictionaries.vi;

    const switchLocale = (newLocale: Locale) => {
        router.push(router.pathname, router.asPath, { locale: newLocale });
    };

    return { t, locale, switchLocale };
}
